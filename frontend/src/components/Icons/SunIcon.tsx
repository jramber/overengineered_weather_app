import { IIcon} from '../../types/types';
export default function SunIcon ({ size, color}: IIcon) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} width={size} viewBox="0 0 48 48"><path fill={color} d="M22.5 9.5V2h3v7.5Zm12.8 5.3-2.1-2.1 5.3-5.35 2.1 2.15Zm3.2 10.7v-3H46v3ZM22.5 46v-7.5h3V46Zm-9.85-31.25L7.4 9.5l2.1-2.1 5.3 5.3Zm25.9 25.85-5.35-5.3 2.05-2.05 5.4 5.2ZM2 25.5v-3h7.5v3Zm7.55 15.1L7.4 38.5l5.25-5.25 1.1 1 1.1 1.05ZM24 36q-5 0-8.5-3.5T12 24q0-5 3.5-8.5T24 12q5 0 8.5 3.5T36 24q0 5-3.5 8.5T24 36Zm0-3q3.75 0 6.375-2.625T33 24q0-3.75-2.625-6.375T24 15q-3.75 0-6.375 2.625T15 24q0 3.75 2.625 6.375T24 33Zm0-9Z"/></svg>
    )
}