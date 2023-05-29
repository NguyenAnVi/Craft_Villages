import classNames from 'classnames/bind';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

type ButtonProps = {
  className?: String;
  children?: React.ReactNode;
  color?: 'primary' | 'yellow';
  size?: string;
  border?: 'round' | 'circle';
} & Omit<React.ComponentProps<'button'>, 'children'>;

const Button = ({
  className,
  color,
  size,
  border,
  children,
  ...rest
}: ButtonProps) => {
  const classes = cx(
    'wrapper',
    { className: [className] },
    color,
    size,
    border,
  );

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;
