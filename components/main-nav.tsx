import Link from "next/link"
import Image from "next/image"

export function MainNav() {
  return (
    <div className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/kinetic-logo.png" alt="Kinetic" width={60} height={60} />
      </Link>
      <nav className="hidden md:flex items-center space-x-6">
        <Link
          href="/#features"
          className="text-sm font-medium text-white transition-colors hover:text-white/80"
          scroll={false}
        >
          Features
        </Link>
        <Link
          href="/#how-it-works"
          className="text-sm font-medium text-white transition-colors hover:text-white/80"
          scroll={false}
        >
          How It Works
        </Link>
        <Link
          href="/#success-stories"
          className="text-sm font-medium text-white transition-colors hover:text-white/80"
          scroll={false}
        >
          Success Stories
        </Link>
        <Link
          href="/#resources"
          className="text-sm font-medium text-white transition-colors hover:text-white/80"
          scroll={false}
        >
          Resources
        </Link>
      </nav>
    </div>
  )
}
