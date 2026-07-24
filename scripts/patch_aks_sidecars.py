#!/usr/bin/env python3
"""Surgically add the azure-kubernetes-service entries to the content-kit sidecars.

Pure string insertion before the final `}` so existing bytes are never rewritten
(keeps the minified files minified and diff-clean).
"""
import json, os, re, sys

KIT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "azure-clone-next", "content-kit"))
US = "azure_kubernetes_service"   # underscored key
HY = "azure-kubernetes-service"   # hyphen key (card-icons only)

def icon_slug(t):
    t = (t or "").lower()
    t = t.replace("&amp;", "and").replace("&", "and")
    t = re.sub(r"[^a-z0-9]+", "-", t)
    t = re.sub(r"^-|-$", "", t)
    return t[:50]

def insert_minified(path, key, value):
    with open(path, encoding="utf-8") as f:
        txt = f.read()
    txt = txt.rstrip()
    assert txt.endswith("}"), path
    if f'"{key}"' in txt:
        print("  already present, skipping", path); return
    frag = json.dumps({key: value}, ensure_ascii=False, separators=(",", ":"))[1:-1]
    new = txt[:-1] + "," + frag + "}"
    # sanity: must still parse
    json.loads(new)
    with open(path, "w", encoding="utf-8") as f:
        f.write(new)
    print("  patched", os.path.basename(path))

def insert_faq_pretty(path, key, questions):
    with open(path, encoding="utf-8") as f:
        txt = f.read()
    stripped = txt.rstrip()
    assert stripped.endswith("}"), path
    if f'"{key}"' in stripped:
        print("  already present, skipping", path); return
    body = stripped[:-1].rstrip()  # drop final } and any trailing ws/newline
    qlines = ",\n".join('    ' + json.dumps(q, ensure_ascii=False) for q in questions)
    frag = f',\n  "{key}": [\n{qlines}\n  ]\n}}\n'
    new = body + frag
    json.loads(new)
    with open(path, "w", encoding="utf-8") as f:
        f.write(new)
    print("  patched", os.path.basename(path))

# ---------- FAQ content ----------
FAQ = [
    ("Do we have to rewrite our .NET and Java applications to run on Azure Kubernetes Service?",
     "No. Azure Kubernetes Service supports both Windows Server and Linux containers, so most legacy "
     ".NET Framework and Java workloads are containerized with minimal code changes. We modernize "
     "incrementally using the strangler-fig pattern — extracting services from the monolith over "
     "time rather than rewriting the application in a single high-risk cutover."),
    ("How does Folio3 migrate to AKS without interrupting live operations?",
     "We run a phased, hybrid migration. Using Azure Arc and multi-region replication, workloads move "
     "cluster by cluster while the existing environment keeps serving traffic. Rolling deployments "
     "and automated rollback mean each cutover happens with zero scheduled downtime."),
    ("How is compliance and identity handled for regulated FinTech, healthcare, and telecom workloads?",
     "Clusters are deployed inside your Azure Landing Zone and integrated with Microsoft Entra ID "
     "(Azure Active Directory). Role-based access control, Azure Policy, network isolation, and audit "
     "logging are enforced platform-wide, so governance is built in rather than bolted on after the "
     "fact."),
    ("What does Azure Kubernetes Service replace in our current estate?",
     "AKS replaces legacy Windows and Linux virtual machines, monolithic IIS web servers, and manual "
     "VM provisioning. It fits into enterprise Azure Landing Zones and connects directly to your ITSM "
     "tooling, Azure ExpressRoute, and Azure DevOps release gates."),
    ("How does AKS reduce our infrastructure and maintenance costs?",
     "Pod-level autoscaling means you pay for the compute you actually use instead of over-"
     "provisioning idle VMs. Self-healing nodes and a managed control plane cut the manual patching "
     "and maintenance burden that legacy VM estates carry, freeing engineering time for the roadmap."),
    ("Why choose Folio3 as an Azure Kubernetes Service partner?",
     "Folio3 is a Direct (Tier-1) Microsoft Cloud Solution Provider with Microsoft Solutions Partner "
     "designations and 750+ certified developers who have delivered for 1,000+ clients. That "
     "combination of partnership status and delivery scale de-risks enterprise-grade AKS migrations."),
]
FAQ_HEADING = "Frequently Asked Questions About Azure Kubernetes Service"

# ---------- card icons (title -> icon svg path) ----------
CARD_ICONS = {
    "Seamless Legacy Modernization": "/icons/azure-cloud-service/application-modernization.svg",
    "Unified Enterprise Governance": "/icons/azure-cloud-service/cloud-infrastructure-audits.svg",
    "Downtime-Free Migrations": "/icons/azure-cloud-service/disaster-recovery.svg",
    "Windows and Linux Container Support": "/icons/azure-cloud-service/replatform.svg",
    "Microsoft Entra ID Access Governance": "/icons/azure-managed-services/identity-and-access-management.svg",
    "Azure Landing Zone Alignment": "/icons/azure-cloud-service/cloud-strategy-creation.svg",
    "Azure Arc Hybrid Management": "/icons/azure-cloud-service/hybrid-setups.svg",
    "Multi-Region Disaster Recovery": "/icons/azure-managed-services/disaster-recovery-management.svg",
    "Azure DevOps Release Gates": "/icons/azure-cloud-service/devops-and-continuous-delivery.svg",
    "Tier-1 Microsoft Cloud Solution Provider": "/icons/azure-cloud-service/cloud-platform-identification-and-devops-tools.svg",
    "Microsoft Solutions Partner Designations": "/icons/azure-for-manufacturing/consulting-and-advisory-services.svg",
    "750+ Certified Cloud Developers": "/icons/azure-cloud-service/cloud-native-application-development.svg",
    "1,000+ Clients Served Worldwide": "/icons/azure-for-manufacturing/managed-services.svg",
}
card_icon_map = {}
for title, pth in CARD_ICONS.items():
    slug = icon_slug(title)
    card_icon_map[slug] = pth
    # verify the svg exists on disk
    disk = os.path.join(KIT, "..", "public", pth.lstrip("/"))
    if not os.path.exists(disk):
        print("!! MISSING ICON", pth); sys.exit(1)
print("card icon slugs:", list(card_icon_map.keys()))

TRUST = {
    "heading": "Trusted by Organizations Around the Globe",
    "logos": [
        "/wp-content/uploads/2024/01/ias-savills-logo.webp",
        "/wp-content/uploads/2024/01/ias-cityu-logo.webp",
        "/wp-content/uploads/2024/01/ias-daraz-logo.webp",
        "/wp-content/uploads/2024/01/ias-rff-logo.webp",
        "/wp-content/uploads/2025/07/superior-farms-logo.webp",
    ],
}

CONTENT_LINKS = {
    "azure cloud services": "/azure-cloud-service/",
    "azure managed services": "/azure-managed-services/",
    "microsoft fabric services": "/microsoft-fabric-services/",
    "azure data analytics": "/azure-data-analytics/",
    "microsoft power platform": "/microsoft-power-platform-services/",
}

FAQ_FULL = {"heading": FAQ_HEADING, "items": [{"q": q, "a": a} for q, a in FAQ]}

print("Patching sidecars...")
insert_faq_pretty(os.path.join(KIT, "faq.json"), US, [q for q, _ in FAQ])
insert_minified(os.path.join(KIT, "faq-full.json"), US, FAQ_FULL)
insert_minified(os.path.join(KIT, "card-icons.json"), HY, card_icon_map)
insert_minified(os.path.join(KIT, "trust-band.json"), US, TRUST)
insert_minified(os.path.join(KIT, "content-links.json"), US, CONTENT_LINKS)
print("Done.")
