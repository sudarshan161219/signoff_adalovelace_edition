import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { LoadingModal } from "@/components/modal/loadingModal/LoadingModal";
import api from "@/lib/api/api";
import {
  ArrowRight,
  Zap,
  Shield,
  MousePointer2,
  Loader2,
  CheckCircle2,
  Twitter,
  Coffee,
  Database,
  Terminal,
  Activity,
} from "lucide-react";

export const Landing = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || !name.trim()) return;

    setLoading(true);

    try {
      const { data } = await api.post<{ data: { adminToken: string } }>(
        "/projects",
        { name },
      );

      const { adminToken } = data.data;

      localStorage.setItem("signoff_admin_token", adminToken);
      navigate(`/dashboard/${adminToken}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message ?? "Failed to create project");
      } else {
        alert("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <LoadingModal isOpen={loading} />
      <div className={styles.contentWrapper}>
        {/* NAVBAR */}
        <nav className={styles.nav}>
          <div className={styles.brand}>
            <CheckCircle2 size={24} strokeWidth={2.5} />
            SignOff
          </div>

          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <a
              href="https://x.com/buildwithSud"
              target="_blank"
              rel="noreferrer"
              className={styles.navLink}
              style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
            >
              <Twitter size={14} />
              <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                Updates
              </span>
            </a>
            <a
              href="https://buymeacoffee.com/sudarshanhosalli"
              target="_blank"
              rel="noreferrer"
              className={styles.navLink}
              style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
            >
              <Coffee size={14} />
              <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                Support
              </span>
            </a>
          </div>
        </nav>

        {/* HERO */}
        <main className={styles.hero}>
          <div className={styles.badge}>
            <span className={styles.pulseDot} />
            System_Status: Online [v1.0]
          </div>

          <h1 className={styles.title}>
            The zero-friction protocol for client sign-off.
          </h1>

          <p className={styles.subtitle}>
            Stop chasing email threads. Provision a secure workspace, push your
            assets, and capture a definitive "Yes" or "No" in real-time.
          </p>

          <form onSubmit={handleStart} className={styles.form}>
            <div className={styles.formInner}>
              <div className="flex items-center">
                <div className={styles.inputPrefix}>{`>`}</div>
                <input
                  id="name"
                  autoFocus
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="init_project --name='Logo v2'"
                  className={styles.input}
                  style={{ fontFamily: name ? "monospace" : "inherit" }}
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={!name || loading}
                className={styles.button}
              >
                {loading ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      justifyContent: "center",
                      width: "100%",
                      fontFamily: "monospace",
                      fontSize: "0.85rem",
                    }}
                  >
                    <Loader2 className={styles.spinner} size={14} />
                    <span>THE_MILL_ACTIVE</span>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      gap: "6px",
                    }}
                  >
                    <span>Execute</span>
                    <ArrowRight size={16} />
                  </div>
                )}
              </button>
            </div>
            <p className={styles.helperText}>
              Press [ENTER] to provision workspace. Open source & free.
            </p>
          </form>
        </main>

        {/* SYSTEM ARCHITECTURE (Formerly "How it works") */}
        <section className={styles.stepsSection}>
          <h2 className={styles.sectionTitle}>System Architecture</h2>
          <div className={styles.grid}>
            <div className={styles.card}>
              <Database
                size={24}
                strokeWidth={1.5}
                className={styles.cardIcon}
              />
              <h3>01. The Store</h3>
              <p>
                Allocate a temporary R2 storage bucket and push your
                deliverables.
              </p>
            </div>
            <div className={styles.card}>
              <Terminal
                size={24}
                strokeWidth={1.5}
                className={styles.cardIcon}
              />
              <h3>02. Transmit</h3>
              <p>
                Dispatch the secure, tokenized URL to your client. Zero login
                friction.
              </p>
            </div>
            <div className={styles.card}>
              <Activity
                size={24}
                strokeWidth={1.5}
                className={styles.cardIcon}
              />
              <h3>03. Consensus</h3>
              <p>
                Clients review via web UI. Real-time WebSocket sync captures the
                approval.
              </p>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className={styles.features}>
          <div className={styles.grid}>
            <div className={styles.card}>
              <Zap strokeWidth={1.5} className={styles.cardIcon} />
              <h3 style={{ fontFamily: "inherit", fontWeight: 600 }}>
                Lightning Fast
              </h3>
              <p>
                Type a project name and get a live workspace instantly. No
                databases to configure.
              </p>
            </div>
            <div className={styles.card}>
              <Shield strokeWidth={1.5} className={styles.cardIcon} />
              <h3 style={{ fontFamily: "inherit", fontWeight: 600 }}>
                Ephemeral Security
              </h3>
              <p>
                Powered by Cloudflare R2. Workspaces are isolated and accessed
                via secure tokens.
              </p>
            </div>
            <div className={styles.card}>
              <MousePointer2 strokeWidth={1.5} className={styles.cardIcon} />
              <h3 style={{ fontFamily: "inherit", fontWeight: 600 }}>
                Client UX First
              </h3>
              <p>
                The client interface is beautifully simple. They click 'Approve'
                and you get notified.
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className={styles.footer}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              color: "#FFF",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: 500 }}>
              © {new Date().getFullYear()} SignOff. Built for Freelancers.
            </span>
            <a
              href="https://x.com/buildwithSud"
              target="_blank"
              rel="noreferrer"
              style={{
                opacity: 0.6,
                fontSize: "0.8rem",
                color: "#FFF",
                textDecoration: "none",
                fontFamily: "monospace",
              }}
            >
              [ Built by Sudarshan ]
            </a>
            <span
              style={{
                opacity: 0.9,
                fontFamily: "monospace",
                fontSize: "0.65rem",
                marginTop: "1.5rem",
                letterSpacing: "0.05em",
                color: "oklch(0.645 0.246 16.439)",
              }}
              title="In honor of Ada Lovelace, the first computer programmer."
            >
              // ARCHITECTURE_INSPIRED_BY_NOTE_G
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};
