import Hero from '../components/Hero'
import Features from '../components/Features'
import { Updates, Supporters, StorePreview, OwnerAnnouncement } from '../components/HomeSections'
import VotingPreview from '../components/VotingPreview'

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Updates />
      <VotingPreview />
      <StorePreview />
      <Supporters />
      <OwnerAnnouncement />
    </>
  )
}
