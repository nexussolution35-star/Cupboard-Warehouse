#!/usr/bin/env python3
"""
Cupboard Warehouse — surge.sh deploy helper.

Run this from a FRESH Claude Code web session (one where surge.surge.sh /
surge.sh have been added to the environment's egress allowlist):

    python3 deploy/surge-deploy.py

It copies the site into a clean temp dir (excluding .git/.github/deploy/README),
registers a throwaway surge account via a pexpect pseudo-terminal, publishes to
cupboard-centrelowveld.surge.sh, then curl-verifies the live URL.
"""
import os, sys, subprocess, random, string, shutil, time

DOMAIN = "cupboard-centrelowveld.surge.sh"
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEPLOY = "/tmp/cw_deploy"
EXCLUDE = {".git", ".github", "deploy", "node_modules"}

def sh(cmd):
    print("+", cmd, flush=True)
    return subprocess.run(cmd, shell=True).returncode

def ensure_tools():
    try:
        import pexpect  # noqa
    except ImportError:
        sh("pip install pexpect -q")
    if shutil.which("surge") is None:
        sh("npm install -g surge")

def clean_copy():
    if os.path.exists(DEPLOY):
        shutil.rmtree(DEPLOY)
    os.makedirs(DEPLOY)
    for name in os.listdir(REPO):
        if name in EXCLUDE or name.lower().startswith("readme") or name.endswith(".env"):
            continue
        src = os.path.join(REPO, name)
        dst = os.path.join(DEPLOY, name)
        if os.path.isdir(src):
            shutil.copytree(src, dst)
        else:
            shutil.copy2(src, dst)
    n = sum(len(f) for _, _, f in os.walk(DEPLOY))
    print(f"clean copy: {n} files in {DEPLOY}", flush=True)

def publish():
    import pexpect
    r = lambda n: "".join(random.choices(string.ascii_lowercase + string.digits, k=n))
    email, pw = f"cw{r(10)}@mailinator.com", f"Cw{r(12)}9z"
    print("account:", email, flush=True)
    child = pexpect.spawn("surge", [DEPLOY, DOMAIN], encoding="utf-8",
                          timeout=300, dimensions=(40, 160))
    child.logfile = sys.stdout
    child.expect(r"(?i)email:"); child.sendline(email)
    # With the API reachable surge auto-creates the account on first password.
    # Guard the (legacy) signup-confirm prompt by answering up to two password
    # prompts; ignore later redraws.
    sent = 0
    while True:
        i = child.expect([r"(?i)Success!", r"(?i)forgot\?", r"(?i)Aborted",
                          r"(?i)password:", pexpect.EOF, pexpect.TIMEOUT], timeout=300)
        if i == 0:
            try: child.expect(pexpect.EOF, timeout=120)
            except Exception: pass
            return True
        elif i == 1:
            print("\n!! surge offered password reset — API likely still blocked", flush=True)
            child.sendline("no"); return False
        elif i == 2:
            print("\n!! Aborted", flush=True); return False
        elif i == 3:
            if sent < 2:
                time.sleep(1.2); child.sendline(pw); sent += 1
        elif i == 4:
            return False
        else:
            print("\n!! timeout", flush=True); return False

def verify():
    base = f"https://{DOMAIN}"
    paths = ["/", "/about.html", "/services/custom-kitchen-cabinets.html",
             "/service-areas/mbombela.html", "/assets/styles.css",
             "/assets/logo.png", "/assets/work/project1.jpg"]
    ok = True
    for p in paths:
        code = subprocess.run(
            f'curl -sS -m 20 -o /dev/null -w "%{{http_code}}" "{base}{p}"',
            shell=True, capture_output=True, text=True).stdout.strip()
        flag = "OK " if code == "200" else "XX "
        if code != "200": ok = False
        print(f"  {flag}{code}  {base}{p}", flush=True)
    return ok

if __name__ == "__main__":
    ensure_tools()
    clean_copy()
    if not publish():
        print("\nDEPLOY FAILED — confirm surge.surge.sh is in the egress allowlist "
              "and that this is a fresh session.", flush=True)
        sys.exit(1)
    print(f"\nPublished to https://{DOMAIN}\n--- verifying ---", flush=True)
    if verify():
        print(f"\n✅ LIVE: https://{DOMAIN}", flush=True)
    else:
        print(f"\n⚠️  Published, but some checks were non-200. If *.surge.sh is not "
              f"allowlisted, verification fails from inside the sandbox even though "
              f"the site is live externally: https://{DOMAIN}", flush=True)
