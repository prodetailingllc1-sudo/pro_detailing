import Image from 'next/image';

export function PpfWordmark({ className = '' }: { className?: string }) {
  return (
    <span
      className={`ppf-wordmark ${className}`.trim()}
    >
      <Image src="/pro-mark.png" alt="" width={400} height={400} />
      <span className="ppf-wordmark-divider" aria-hidden="true" />
      <span className="ppf-wordmark-copy">
        <strong>
          <span>PRO</span> <span className="ppf-accent">PPF</span>
        </strong>
        <small>
          <span>Paint Protection Film</span>
        </small>
      </span>
    </span>
  );
}
