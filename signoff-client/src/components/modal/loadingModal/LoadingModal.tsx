import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
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
];

interface LoadingModalProps {
  isOpen: boolean;
}

export const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % BERNOULLI_SEQUENCE.length);
    }, 300);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const currentB = BERNOULLI_SEQUENCE[index];

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <Loader2 size={16} className={styles.spinner} />
          <span>STATUS: THE_MILL_ACTIVE</span>
        </div>

        <div className={styles.terminal}>
          <div
            className={styles.mutedLine}
          >{`> Provisioning secure workspace...`}</div>
          <div
            className={styles.mutedLine}
          >{`> Executing Note_G_Sequence`}</div>
          <div className={styles.activeLine}>
            {`> Computing B_${currentB.n} = ${currentB.val}`}
            <span className={styles.cursor}>_</span>
          </div>
        </div>

        <div className={styles.footer}>// ARCHITECTURE: LOVELACE_1843</div>
      </div>
    </div>
  );
};
