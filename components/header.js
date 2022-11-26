// See how we use <Link /> instead of <a>
// That is because Next.js provides some special features
// To allow client-side route navigation
import Link from "next/link";
import Image from "next/image"
import basketBallIcon from "../resources/basketball.png"

// Just a generic header, part of the default layout
// so it appears on all pages that use the default layout
export default function Header() {
  return (
    <>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <h1 id="mainTitle" className="content">NBA Teams Search <Image id="basketballIcon"
        src={basketBallIcon} width="50" height="40" alt="Basketball"></Image>
      </h1>
      <div className="item navbar-menu">
        <div className="content">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/liked_player">Liked player</Link></li>
          </ul>
        </div>
      </div>
    </>
  )
}
