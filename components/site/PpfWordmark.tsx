import Image from 'next/image';

export function PpfWordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`ppf-wordmark ${className}`.trim()}>
      <span className="sr-only">PRO PPF — Paint Protection Film</span>
      <Image src="/pro-mark.png" alt="" width={400} height={400} />
      <span className="ppf-wordmark-divider" aria-hidden="true" />
      <span className="ppf-wordmark-copy" aria-hidden="true">
        <strong>
          <span>PRO</span>
          <span>
            <span className="ppf-accent">P</span>PF
          </span>
        </strong>
        <small>
          <span>Paint Protection Film</span>
        </small>
      </span>
    </span>
  );
}
