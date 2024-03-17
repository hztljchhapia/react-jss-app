import {
  Text,
  RichText,
  Field,
  withDatasourceCheck,
  Link,
  Image,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type HeaderProps = ComponentProps & {
  fields: {
    [key: string]: any;
  };
};

/**
 * A simple Content Block component, with a heading and rich text block.
 * This is the most basic building block of a content site, and the most basic
 * JSS component that's useful.
 */
const Header = ({ fields }: HeaderProps): JSX.Element => (
  <div className="main-footer">
    <div className="container">
      <div className="footer">
        <div className="logo">
          <Image field={fields.Image} id="logo-main" />
        </div>
        <div className="footer-links">
          <ul className="feader-link">
            {fields?.HeaderLinks &&
              fields?.HeaderLinks?.map((values: any) => {
                return (
                  <li key={values?.fields?.CTA}>
                    <Link field={values?.fields?.CTA} />
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default withDatasourceCheck()<HeaderProps>(Header);
