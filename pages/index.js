import Head from "next/head";
import { useState } from "react";
import styles from "../styles/layout.module.css";
import Countdown from "../components/Countdown";

export default function Home() {
  const targetDate = new Date(2025, 11, 15, 1, 0, 0) 
  const nomeCompleto = "Guilherme Henrique Santos Pereira" 
  const turma = "INFO 6B" 

  const [finished, setFinished] = useState(false) 

  function handleFinished() {
    setFinished(true) 
  }

  return (
    <>
      <Head>
        <title>Formatura — {nomeCompleto}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <body className={styles.body}>  
      <main className={styles.container}>
        <header className={styles.header}>
          <div className={styles.titleArea}>
            <h1>{nomeCompleto}</h1>
            <p className={styles.turma}>{turma} — Formatura 2025</p>
          </div>
        </header>

        <section className={styles.card}>
          {!finished ? (
            <>
              <h2>Contagem regressiva para a formatura</h2>
              <Countdown targetDate={targetDate} onFinished={handleFinished} />
            </>
          ) : (
            <div className={styles.finished}>
              <h2>Parabéns, chegou o grande dia da nossa formatura!</h2>
              <p className={styles.afterText}>
                Depois da formatura, pretendo ingressar em uma universidade
                renomada e trabalhar para fora com Programação!
              </p>
            </div>
          )}
        </section>
    

        <footer className={styles.footer}>
          <p>Feito por {nomeCompleto} - Boa sorte para nós! 🎓</p>
        </footer>
      </main>
    </body>
    </>
  ) 
}
