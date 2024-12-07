import Logo from "./Logo";

const Footer = () => {
  return (
    <div>
      <div className="container mx-auto px-2 flex justify-between py-11">
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
            <p>01851891846</p>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-4">
        <p className="text-sm text-center">
          2024 funcraft. All rights reverved
        </p>
      </div>
    </div>
  );
};

export default Footer;
