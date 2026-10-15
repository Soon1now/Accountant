import NavBar from "../features/NavBar";
import NavItem from "../features/NavItem";

export default function Header() {
    return (
        <header className='flex h-20 w-full justify-between gap-10 items-center px-4 bg-white'>
            <div className="flex h-[50px] w-[50px] bg-blue rounded-full"></div>

            <NavBar />
        </header>
    );
}