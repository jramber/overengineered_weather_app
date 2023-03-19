import { IIcon } from '../../types/types';
export default function ArrowIcon ({size, color}: IIcon) {
  /* points to the north */
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} width={size} viewBox="0 0 48 48"><path fill={color} d="M22.5 44V9.7L12.1 20.1 10 18 24 4l14 14-2.1 2.1L25.5 9.7V44Z"/></svg>
  )
}