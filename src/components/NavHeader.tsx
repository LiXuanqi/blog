import Link from 'next/link';

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

export default function NavHeader() {
    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
            <nav className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
                <Link href="/" className="text-xl font-bold">
                    My Blog
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
                <NavItem text="Blog" url="/blogs"/>
                <NavItem text="Notes" url="/notes"/>
            </NavigationMenuList>
        </NavigationMenu>

    );
}

function NavItem({text, url}: {
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