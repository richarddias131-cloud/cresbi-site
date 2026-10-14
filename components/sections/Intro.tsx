import { Fragment } from "react";
import styles from "./Intro.module.css";

// Abertura do site: as três barras do símbolo montam o "E" de CR≡SBI, a frase entra
// palavra por palavra e a tela sobe como uma cortina. Tudo em CSS, sem depender de JS
// para terminar. O script só decide se toca (primeira visita da sessão, sem redução de
// movimento) e deixa pular com clique, toque ou tecla.

const FRASE = ["Tecnologia", "que", "trabalha", "pelo", "seu", "negócio."];
const DESTAQUE = "negócio.";

const script = `(function(){
  var d=document.documentElement, visto=null;
  try { visto = sessionStorage.getItem("cresbi-intro"); } catch (e) {}
  if (visto || matchMedia("(prefers-reduced-motion: reduce)").matches) { d.setAttribute("data-intro","skip"); return; }
  d.setAttribute("data-intro","play");
  try { sessionStorage.setItem("cresbi-intro","1"); } catch (e) {}
  function fim(){ if (d.getAttribute("data-intro") === "play") d.setAttribute("data-intro","done"); }
  document.addEventListener("DOMContentLoaded", function(){
    var el = document.getElementById("intro");
    if (!el) return;
    el.addEventListener("click", fim);
    el.addEventListener("animationend", function(e){ if (e.animationName.indexOf("introOut") > -1) fim(); });
  });
  addEventListener("keydown", fim, { once: true });
})();`;

export function Intro() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <div id="intro" className={styles.intro} aria-hidden="true">
        <div className={styles.inner}>
          <span className={styles.wordmark}>
            <span className={styles.left}>CR</span>
            <svg className={styles.bars} viewBox="0 0 100 85" preserveAspectRatio="none" focusable="false">
              <rect className={styles.bar1} x="0" y="0" width="100" height="18" />
              <rect className={styles.bar2} x="0" y="33.5" width="77" height="18" />
              <rect className={styles.bar3} x="0" y="67" width="100" height="18" />
            </svg>
            <span className={styles.right}>SBI</span>
          </span>
          <p className={styles.phrase}>
            {FRASE.map((w, i) => (
              <Fragment key={i}>
                <span className={styles.mask}>
                  <span
                    className={`${styles.word} ${w === DESTAQUE ? styles.gold : ""}`}
                    style={{ animationDelay: `${1.05 + i * 0.07}s` }}
                  >
                    {w}
                  </span>
                </span>
                {i < FRASE.length - 1 ? " " : null}
              </Fragment>
            ))}
          </p>
          <span className={styles.code}>{"// cresbi.com.br"}</span>
        </div>
        <span className={`${styles.cross} ${styles.tl}`}>+</span>
        <span className={`${styles.cross} ${styles.tr}`}>+</span>
        <span className={`${styles.cross} ${styles.bl}`}>+</span>
        <span className={`${styles.cross} ${styles.br}`}>+</span>
      </div>
    </>
  );
}
