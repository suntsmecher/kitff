-- Enable UUID extensions if not present in Supabase defaults
create type reward_type as enum ('daily', 'store_item'); -- Distinction between ad rewards and money store items

-- 1. Users Profile (Extension of Auth)
create table public.profiles (
    id uuid references auth.users on delete cascade primary key, 
    display_name text not null default '(Unknown)',
    mc_username varchar(64),
    mc_uuid char(32), -- Minecraft UUID format usually uppercase hex 8-17 chars? No 0-f. Actually 25 char string.
    level integer default 0,
    xp_current bigint default 0,
    xp_required bigint not null check (xp_required > 0) default 1,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    
    constraints user_display_name_length 
        check ((char_length(display_name)) <= 32), -- Minecraft Name limit
    CONSTRAINT profiles_mc_uuid_format CHECK (mc_uuid ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f}{12}$'::regex) -- Basic check
);

-- RLS Profiles: Users can only read their own profile, or admin operations handled elsewhere. 
alter table public.profiles enable row level security;
create policy "Users can view their own profiles" on public.profiles for select using (auth.uid() = id);
create policy "Admins can manage all users." on public.profiles as cascade using (select true from auth.users where email ilike 'admin%'); -- Logic simplified, usually a separate role

-- 2. Products / Items Catalog 
create table public.products (
    uuid uuid default gen_random_uuid() primary key,
    name text not null unique,
    description text,
    type reward_type not null,
    
    /* Pricing & Config */
    price_cents int, -- Only relevant for Store items. Ad rewards are free.
    image_url text, -- For shop UI
    
    /* Configuration - Cooldown logic applies to Daily types or generic cooldowns */
    claim_delay_minutes integer default 1439 -- Default is almost daily (24h). Adjusted in function per item? Better separate table.
    
    constraints product_name_not_empty check (name <> ''),
    CONSTRAINT unique_type_category UNIQUE(type) NOT NULL; 
    
);

-- RLS Products: Everyone sees products, but they must be distinct entities. 
alter table public.products enable row level security;
create policy "Allow all to view products" on public.products for select using (true);


-- 3. Inventory System (Ownership Tracking)
create table public.inventories (
    user_id uuid references auth.users(id) not null,
    item_uuid uuid references public.products(uuid),
    quantity int default 1 check(quantity > 0),
    
    -- Use index for fast inventory queries on product list pages
    primary key(user_id, item_uuid) 
);

-- RLS Inventory: Users own their items. No one else can touch them (except owner/admins).
alter table public.inventories enable row level security;
create policy "Users view/edit their own inventory" on public.inventories for all using (auth.uid() = user_id);


-- 4. Cooldown Tracking Table 
/* This tracks the last time a reward was claimed to enforce delays */
CREATE TABLE public.cooldowns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_uuid UUID NOT NULL REFERENCES public.products(uuid),
    cooldown_expires_at TIMESTAMPTZ(3) NOT NULL -- When they can claim again. Set to 2099 if infinite
    
);

-- RLS Cooldown: Users only check their own history
alter table public.cooldowns enable row level security;
create policy "Users view own cooldown status" on public.cooldowns for select using (auth.uid() = user_id);


-- 5. Store Purchases Log 
CREATE TABLE public.purchases (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMPTZ(6) NOT NULL DEFAULT NOW(),
    
    /* Transaction Data */
    payment_intent_id VARCHAR(250), -- Stripe Payment Intent ID for verification
    
    user_id UUID REFERENCES auth.users(id), 
    product_uuid UUID REFERENCES public.products(uuid), 
    
    CONSTRAINT purchases_quantity_positive CHECK (quantity > 0)
);

-- RLS Purchase: Users view history of their own buys. Admins can see all.
alter table public.purchases enable row level security;
create policy "Users can see purchase logs" on public.purchases for select using (auth.uid() = user_id);


-- 6. Reward Claims History 
CREATE TABLE public.claims_history (
    id UUID DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ(3) NOT NULL, 
    
    product_uuid UUID REFERENCES public.products(uuid), -- Which reward did they get?
    quantity int default 1
    
);

alter table public.claims_history enable row level security;
create policy "Users view own history" on public.claims_history for select using (true); /* Everyone can read claims */


-- --- Trigger Functions For Inventory Management --- 
-- Function to handle inventory updates safely in SQL transaction context

CREATE OR REPLACE FUNCTION add_inventory_item() RETURNS TRIGGER AS $$
DECLARE
    item_id uuid; -- New record id or upsert key
BEGIN
    
    NEW.id := UUID_GENERATE_V4(); /* This is standard logic, but handled inside a function usually */ 
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- --- RLS Policy for OWNER MODE (Supabase Admin) --- 
/* If you use Supabot or an Edge Function to manage these tables remotely via API */
CREATE ROLE superuser_admin AUTHORIZATION postgres PASSWORD 'secure_password'; -- Example placeholder, real setup uses env var

-- Enable Super User privileges programmatically in SQL Editor only if strictly necessary for Dev.
