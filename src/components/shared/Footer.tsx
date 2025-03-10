import Link from "next/link";
import Logo from "./Logo";

const Footer = () => {
  return (
    <div className="bg-secondary">
      <div className="container">
        <div className="flex justify-between flex-wrap py-11 gap-11">
          <div>
            <Logo />
            <p className="max-w-[500px] mt-4">
              {`Funcraft is your one-stop multivendor platform for premium furniture. Explore diverse styles from trusted sellers to elevate your home or office. Shop effortlessly with great deals and reliable delivery!`}
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-medium">Contact Us</h2>
            <div className="mt-4 flex flex-col gap-1">
              <p>Mirpur-1, Dhaka, Bangladesh</p>
              <p>info.jhshakil@gmail.com</p>
              <p>+8801851891846</p>
            </div>
          </div>
        </div>
        <div className="py-4 flex justify-between flex-wrap gap-11">
          <p className="text-sm">
            2024 <span className="text-primary">funcraft</span>. All rights
            reverved
          </p>
          {/* <ul className="flex items-center divide-x-2 divide-border">
            <li className="px-3">
              <Link href={`/`}>Terms & Conditions</Link>
            </li>
            <li className="px-3">
              <Link href={`/`}>Privacy & Policy</Link>
            </li>
          </ul> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
