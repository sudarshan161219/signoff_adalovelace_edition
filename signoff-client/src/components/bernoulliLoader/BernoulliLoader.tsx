import { useState, useEffect } from "react";
import styles from "./index.module.css";

const BERNOULLI_SEQUENCE = [
  { n: 0, val: "1" },
  { n: 1, val: "-1/2" },
  { n: 2, val: "1/6" },
  { n: 4, val: "-1/30" },
  { n: 6, val: "1/42" },
  { n: 8, val: "-1/30" },
  { n: 10, val: "5/66" },
  { n: 12, val: "-691/2730" },
  { n: 14, val: "7/6" },
  { n: 16, val: "-3617/510" },
];

interface BernoulliLoaderProps {
  message?: string;
}

export const BernoulliLoader = ({
  message = "Processing",
}: BernoulliLoaderProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Cycle to the next number every 400ms to simulate calculation
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % BERNOULLI_SEQUENCE.length);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  const currentB = BERNOULLI_SEQUENCE[index];

  return (
    <div className={styles.container}>
      <div className={styles.message}>{`> ${message}...`}</div>
      <div className={styles.computation}>
        {`> Computing B_${currentB.n} = ${currentB.val}`}
        <span className={styles.cursor}>_</span>
      </div>
    </div>
  );
};
