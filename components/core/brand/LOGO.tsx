import Link from "next/link";

const LOGOCOMP = ({ size }: { size?: boolean }) => {
  console.log(size);
  return (
    <Link href="/">
      <img
        className={`rounded-full bg-transparent size-10`}
        src="/Logo-green.svg"
        alt=""
      />
    </Link>
  );
};

export default LOGOCOMP;
