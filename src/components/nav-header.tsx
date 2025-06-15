import Link from 'next/link';
import Image from 'next/image'

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export default function NavHeader() {
    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
            <nav className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
                <Link href="/" className="text-xl font-bold">
                    <div className='flex items-center'>

                        <Image
                            src="/logo.png"
                            width={50}
                            height={50}
                            alt="Picture of the author"
                        />
                        {/* <span>1x7</span> */}

                    </div>
                </Link>
                <div className="flex items-center space-x-6">
                    <NavTabs />
                </div>
            </nav>
        </header>
    );
}

function NavTabs() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavItem text="Blog" url="/blogs" />
                <NavItem text="Notes" url="/notes" />
            </NavigationMenuList>
        </NavigationMenu>

    );
}

function NavItem({ text, url }: {
    text: string;
    url: string;
}) {
    return (
        <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href={url}>{text}</Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
    );

}