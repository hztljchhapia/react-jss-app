import { Text, withDatasourceCheck, Link } from '@sitecore-jss/sitecore-jss-nextjs';
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
  <>
    <div className="home">
      <div className="container">
        <div className="home-wrapper">
          <div className="home-content">
            {/* <h3>Welcome..</h3> */}
            <Text tag="h3" field={fields.Heading} />
            <Text tag="span" field={fields.Content} />
            {/* <span className='info-text'>Let’s bring you back to a better place</span> */}
          </div>
          <div className="home-link">
            <Link field={fields.CTA} />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default withDatasourceCheck()<HeaderProps>(Header);
