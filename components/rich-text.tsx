import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Bloques con los que se escriben las páginas legales en los diccionarios.
 * Mantener el contenido como texto plano (y no como JSX) es lo que permite
 * tener las mismas páginas en tres idiomas sin duplicar el marcado.
 */
export type Block =
  | { h2: string }
  | { h3: string }
  | { p: string }
  | { ul: string[] }
  | { ol: string[] };

/**
 * Marcas en línea soportadas dentro de cada string:
 *   **negrita**            → <strong>
 *   _cursiva_              → <em>
 *   [texto](/ruta)         → link interno (o externo si empieza con http/mailto)
 */
export function Inline({ text }: { text: string }) {
  return <>{parse(text)}</>;
}

/** Renderiza una lista de bloques dentro de un contenedor `.prose-legal`. */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if ("h2" in block) {
          return (
            <h2 key={index}>
              <Inline text={block.h2} />
            </h2>
          );
        }
        if ("h3" in block) {
          return (
            <h3 key={index}>
              <Inline text={block.h3} />
            </h3>
          );
        }
        if ("p" in block) {
          return (
            <p key={index}>
              <Inline text={block.p} />
            </p>
          );
        }
        if ("ul" in block) {
          return (
            <ul key={index}>
              {block.ul.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Inline text={item} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <ol key={index}>
            {block.ol.map((item, itemIndex) => (
              <li key={itemIndex}>
                <Inline text={item} />
              </li>
            ))}
          </ol>
        );
      })}
    </>
  );
}

/** Reemplaza `{clave}` por su valor en todos los strings de una lista de bloques. */
export function fill(blocks: Block[], values: Record<string, string>): Block[] {
  const swap = (text: string) =>
    text.replace(/\{(\w+)\}/g, (match, key) => values[key] ?? match);

  return blocks.map((block) => {
    if ("h2" in block) return { h2: swap(block.h2) };
    if ("h3" in block) return { h3: swap(block.h3) };
    if ("p" in block) return { p: swap(block.p) };
    if ("ul" in block) return { ul: block.ul.map(swap) };
    return { ol: block.ol.map(swap) };
  });
}

const TOKEN = /(\*\*[^*]+\*\*|_[^_]+_|\[[^\]]+\]\([^)]+\))/g;

function parse(text: string): ReactNode[] {
  return text.split(TOKEN).map((chunk, index) => {
    if (chunk.startsWith("**") && chunk.endsWith("**")) {
      return <strong key={index}>{chunk.slice(2, -2)}</strong>;
    }

    if (chunk.startsWith("_") && chunk.endsWith("_") && chunk.length > 2) {
      return <em key={index}>{chunk.slice(1, -1)}</em>;
    }

    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(chunk);
    if (link) {
      const [, label, href] = link;
      if (/^(https?:|mailto:)/.test(href)) {
        return (
          <a
            key={index}
            href={href}
            {...(href.startsWith("http")
              ? { target: "_blank", rel: "noreferrer" }
              : {})}
          >
            {label}
          </a>
        );
      }
      return (
        <Link key={index} href={href}>
          {label}
        </Link>
      );
    }

    return chunk;
  });
}
