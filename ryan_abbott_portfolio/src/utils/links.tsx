import { Link } from 'react-router-dom';

type Base = {
  label: string;
  icon: string;
  iconPosition?: 'left' | 'right';
  iconClassName?: string;
  variant?: 'outline' | 'primary';
};

type ExternalProps = Base & { href: string; to?: never; target?: string; rel?: string };
type InternalProps = Base & { to: string; href?: never; target?: never; rel?: never };

type LinkButtonProps = ExternalProps | InternalProps;

const VARIANT_CLASS = {
  outline: 'flex items-center gap-2 border border-slate-600 text-slate-300 px-6 py-3 rounded-lg hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all duration-200',
  primary: 'flex items-center gap-2 bg-cyan-500 text-slate-950 font-semibold px-6 py-3 rounded-lg hover:bg-cyan-400 transition-all duration-200',
};

function LinkButton({
  label,
  icon,
  iconPosition = 'left',
  iconClassName = '',
  variant = 'outline',
  ...rest
}: LinkButtonProps) {
  const className = VARIANT_CLASS[variant];
  const iconEl = <i className={`fa ${icon} ${iconClassName}`.trim()} />;
  const content = iconPosition === 'right'
    ? <>{label}{iconEl}</>
    : <>{iconEl}{label}</>;

  if ('to' in rest && rest.to) {
    return <Link to={rest.to} className={className}>{content}</Link>;
  }

  return (
    <a href={(rest as ExternalProps).href} target={(rest as ExternalProps).target} rel={(rest as ExternalProps).rel} className={className}>
      {content}
    </a>
  );
}

export { LinkButton };
