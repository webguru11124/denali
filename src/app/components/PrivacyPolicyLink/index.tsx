import { outsideRoutes } from 'app/router';

interface PrivacyPolicyLinkProps {
  className?: string;
  text?: string;
}

const PrivacyPolicyLink: React.FC<PrivacyPolicyLinkProps> = ({
  className,
  text,
}) => (
  <a
    className={className}
    href={outsideRoutes.privacyPolicy.create()}
    target="_blank"
    rel="noreferrer"
  >
    {text}
  </a>
);

export default PrivacyPolicyLink;
