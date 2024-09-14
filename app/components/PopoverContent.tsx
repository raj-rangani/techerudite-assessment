type ButtonProps = {
  message: string;
  hide: boolean;
};

const PopoverContent = ({ message, hide }: ButtonProps) => {
  return (
    <div
      className={
        (hide ? `opacity-0 ` : `opacity-100 `) +
        `absolute bottom-12 right-12 h-14 w-96 max-w-2xl bg-red-100 text-red-500 rounded-xl px-4 py-2 flex items-center transition-opacity shadow-lg font-medium`
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-6"
      >
        <path
          fillRule="evenodd"
          d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
          clipRule="evenodd"
        />
      </svg>
      <text className="ml-2">{message}</text>
    </div>
  );
};

export default PopoverContent;
