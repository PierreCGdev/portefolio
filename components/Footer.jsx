"use client";
export default function Footer() {
  return (
    <footer className="z-5 fixed bottom-0 left-0 w-full px-6 py-6 text-center text-sm border-t border-zinc-700 text-zinc-500 dark:text-zinc-400 bg-white dark:bg-black">
      <p>
        Contactez-moi :{" "}
        <a href="mailto:ton@email.com" className="underline">
          ton@email.com
        </a>
      </p>
    </footer>
  );
}