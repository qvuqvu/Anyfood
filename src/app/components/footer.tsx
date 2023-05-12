import LinkButton from "./buttons/LinkButton";

const Footer = () => {
  return (
    <div className="w-full flex flex-col items-center bg-primary dark:bg-dark_secondary">
      {/* top footer */}
      <div className="w-full flex flex-col px-10 py-10 gap-10 text-white tablet:flex-row tablet:gap-0 tablet:items-start">
        {/* "categories" component */}
        <div className="flex flex-col gap-5 items-center py-5 border border-secondary dark:border-light_grey/30 rounded-xl tablet:border-none tablet:items-start tablet:grow">
          <p className="text-h3 tablet:text-h5">Categories</p>
          <ul className="flex flex-col items-center gap-2 text-body-lg tablet:text-body-sm tablet:items-start">
            <li>
              <LinkButton size="small" path="/products/medical-gadgets">
                Ăn sáng
              </LinkButton>
            </li>
            <li>
              <LinkButton size="small" path="/products/dietary-supplement">
                Ăn trưa
              </LinkButton>
            </li>
            <li>
              <LinkButton size="small" path="/products/medicines">
                Ăn vặt
              </LinkButton>
            </li>
            <li>
              <LinkButton size="small" path="/products/covid">
                Cà phê
              </LinkButton>
            </li>
          </ul>
        </div>

        {/* 'our company' conponent */}
        <div className="flex flex-col gap-5 items-center py-5 border border-primary dark:border-light_grey/30 rounded-xl tablet:border-none tablet:items-start tablet:grow">
          <p className="text-h3 tablet:text-h5">Our company</p>
          <ul className="flex flex-col items-center gap-2 text-body-lg tablet:text-body-sm tablet:items-start">
            <li>
              <LinkButton path="/about">About us</LinkButton>
            </li>
            <li>
              <LinkButton path="/contactUs">Contact us</LinkButton>
            </li>
            <li>
              <LinkButton path="/privacy">Privacy</LinkButton>
            </li>
          </ul>
        </div>
      </div>

      {/* divider */}
      <hr className="w-[calc(100%-4rem)] border-t border-t-primary dark:border-t-light_grey" />

      {/* footer bottom */}
      <div className="w-full py-5 tablet:px-8 tablet:flex tablet:flex-row tablet:items-center">
        {/* copyright */}
        <p className="text-body-sm text-white text-center mr-auto">
          Copyright 2023 Any.Food
        </p>
      </div>
    </div>
  );
};

export default Footer;
