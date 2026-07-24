#!/usr/bin/env python3
"""Generate azure_kubernetes_service.json from a clean section spec.

Authors the items[] stream per section, then DERIVES the legacy parallel arrays
(headings / paragraphs / listItems / ctas / images) and the top-level images[]
so they stay perfectly consistent with the proven managed-services schema.
"""
import json, os

BASE = "https://azure.folio3.com"
UP = BASE + "/wp-content/uploads"

# ---- item helpers ----
def h(tag, text): return {"t": "h", "tag": tag, "text": text}
def p(text): return {"t": "p", "text": text}
def cta(text, href): return {"t": "cta", "text": text, "href": href}
def img(src, w, hh, alt=""): return {"t": "img", "src": src, "w": w, "h": hh, "alt": alt}

HERO = UP + "/2023/07/Cloud-Migration.webp"          # 705x761
CTA_ILLO = UP + "/2023/05/Scale-Your-Business-with-.png"  # 510x493

sections_items = []

# 1) HERO
sections_items.append([
    h("h1", "Azure Kubernetes Service for Enterprise Application Modernization"),
    p("Retire ageing virtual machines and monolithic IIS web servers. Folio3 containerizes your "
      "legacy .NET and Java applications and re-platforms them onto Azure Kubernetes Service (AKS) — "
      "breaking monoliths into manageable microservices through a governed, downtime-free migration."),
    cta("Speak to Our Azure Experts", "#pgForm"),
    cta("Book a Modernization Assessment", "/contact-us/"),
    img(HERO, 705, 761, "Azure Kubernetes Service enterprise application modernization"),
])

# 2) PAIN POINTS (heading regex: "real business problems") -> 4-across animated band
sections_items.append([
    h("h2", "Solve Real Business Problems"),
    p("Legacy infrastructure quietly taxes every release, every audit, and every budget cycle. "
      "Azure Kubernetes Service removes that friction at its source."),
    h("h3", "Manual VM provisioning turns every deployment into a multi-day task"),
    h("h3", "Monolithic systems force expensive over-provisioning of idle servers"),
    h("h3", "Compliance and security teams inherit estates that are hard to govern"),
    h("h3", "Fragmented reporting leaves leadership without a clear operational view"),
])

# 3) SOLUTION / 3 PILLARS -> card grid (icons from card-icons.json)
sections_items.append([
    h("h2", "A Structured, Secure Path off Legacy Infrastructure"),
    p("Azure Kubernetes Service gives regulated enterprises a controlled platform to decompose "
      "monolithic applications into microservices — eliminating the operational risk and "
      "architectural friction of enterprise cloud modernization."),
    h("h3", "Seamless Legacy Modernization"),
    p("Native support for both Linux and Windows Server containers lets your legacy .NET and Java "
      "applications be containerized with minimal code refactoring — so modernization does not "
      "become a ground-up rewrite."),
    h("h3", "Unified Enterprise Governance"),
    p("Direct integration with Microsoft Entra ID (Azure Active Directory) and Azure Landing Zones "
      "enforces strict compliance and identity management out of the box, across every cluster and "
      "workload."),
    h("h3", "Downtime-Free Migrations"),
    p("Built-in disaster recovery, multi-region replication, and Azure Arc support enable gradual "
      "hybrid-cloud migrations — moving workloads without interrupting live operations."),
])

# 4) COMPARISON (heading regex: vs / traditional / wins) -> two-column table
sections_items.append([
    h("h2", "Why Azure Kubernetes Service Wins vs Traditional Virtual Machines"),
    p("The same workloads, run two ways. Here is what changes when you move from VM-based hosting "
      "to a managed Kubernetes platform."),
    h("h3", "Traditional Virtual Machines"),
    p("Manual provisioning and patching of every server"),
    p("Scale by cloning whole VMs — you pay for idle capacity"),
    p("Releases require scheduled downtime and change windows"),
    p("Identity and compliance bolted on machine by machine"),
    p("Disaster recovery is a separate, manual project"),
    h("h3", "Azure Kubernetes Service"),
    p("Declarative, automated provisioning with self-healing nodes"),
    p("Elastic pod autoscaling — pay only for what you run"),
    p("Rolling, zero-downtime deployments by default"),
    p("Microsoft Entra ID and Azure Policy enforced platform-wide"),
    p("Multi-region replication and DR built into the platform"),
])

# 5) PRODUCT DIFFERENTIATORS -> card grid (6 cards)
sections_items.append([
    h("h2", "Product Differentiators That Map to Enterprise Outcomes"),
    p("Every AKS capability we implement ties back to a board-level outcome: lower cost, higher "
      "stability, faster delivery, and stronger compliance."),
    h("h3", "Windows and Linux Container Support"),
    p("Run .NET Framework, .NET Core, and Java side by side. Legacy Windows workloads containerize "
      "without a full rewrite, protecting years of embedded business logic."),
    h("h3", "Microsoft Entra ID Access Governance"),
    p("Centralized identity, role-based access control, and conditional access are enforced at the "
      "cluster level — ending the per-server identity sprawl of a VM estate."),
    h("h3", "Azure Landing Zone Alignment"),
    p("Clusters are deployed inside your enterprise-scale landing zone, inheriting network, policy, "
      "and compliance guardrails from day one."),
    h("h3", "Azure Arc Hybrid Management"),
    p("Govern on-premises, AKS, and multi-cloud Kubernetes from a single control plane while your "
      "workloads migrate at a pace the business controls."),
    h("h3", "Multi-Region Disaster Recovery"),
    p("Active-passive or active-active replication keeps regulated workloads available through "
      "regional failures and planned maintenance."),
    h("h3", "Azure DevOps Release Gates"),
    p("CI/CD pipelines with automated release gates promote builds through environments with "
      "approvals, automated tests, and rollback baked in."),
])

# 6) CREDENTIALS -> card grid (4 cards)
sections_items.append([
    h("h2", "Credentials That De-Risk Your Modernization"),
    p("You are handing over business-critical systems. Folio3's Microsoft partnership and delivery "
      "scale are the assurance that your migration is in expert hands."),
    h("h3", "Tier-1 Microsoft Cloud Solution Provider"),
    p("Direct (Tier-1) CSP status means licensing, support, and escalation come straight from "
      "Folio3 — with no third-party middle layer between you and Microsoft."),
    h("h3", "Microsoft Solutions Partner Designations"),
    p("Recognized for Digital & App Innovation on Azure, validating proven capability in "
      "application modernization and Kubernetes delivery."),
    h("h3", "750+ Certified Cloud Developers"),
    p("A deep bench of certified Azure and Kubernetes engineers to staff enterprise migrations "
      "without resourcing delays."),
    h("h3", "1,000+ Clients Served Worldwide"),
    p("Two decades of delivery across FinTech, healthcare, and telecom — sectors where "
      "compliance and uptime are non-negotiable."),
])

# 7) CASE STUDIES (heading regex: real results) -> case cards
sections_items.append([
    h("h2", "Real Results, Real Impact"),
    p("See how enterprises modernized on Microsoft Azure with Folio3."),
    h("h3", "Savills"),
    p("A global real estate advisor modernized its data and reporting platform on Azure with "
      "Folio3, consolidating analytics and scaling delivery across regions."),
    cta("Read More", "/savills/"),
    h("h3", "City University of Hong Kong"),
    p("City University partnered with Folio3 to modernize applications on Azure, improving "
      "reliability and streamlining IT operations for staff and students."),
    cta("Read More", "/city-university-azure/"),
])

# 8) FAQ (heading matches faq-full heading exactly) -> accordion
sections_items.append([
    h("h2", "Frequently Asked Questions About Azure Kubernetes Service"),
    p("Straight answers to the questions enterprise architects ask before committing to an AKS "
      "modernization program."),
])

# 9) CTA BAND
sections_items.append([
    h("h2", "Ready to Modernize on Azure Kubernetes Service?"),
    p("Book a modernization assessment with our Azure architects and get a phased, downtime-free "
      "migration roadmap for your legacy .NET and Java estate."),
    cta("Book Your Modernization Assessment", "#pgForm"),
    img(CTA_ILLO, 510, 493, "Modernize your enterprise applications on Azure Kubernetes Service"),
])

# ---- derive parallel arrays per section ----
def build_section(items):
    headings, paragraphs, listItems, ctas, images = [], [], [], [], []
    for it in items:
        if it["t"] == "h":
            headings.append({"tag": it["tag"], "text": it["text"]})
        elif it["t"] == "p":
            paragraphs.append(it["text"])
        elif it["t"] == "li":
            listItems.append(it["text"])
        elif it["t"] == "cta":
            ctas.append({"text": it["text"], "href": it["href"]})
        elif it["t"] == "img":
            images.append({"src": it["src"], "alt": it.get("alt", ""), "w": it["w"], "h": it["h"]})
    return {"items": items, "headings": headings, "paragraphs": paragraphs,
            "listItems": listItems, "ctas": ctas, "images": images}

sections = [build_section(s) for s in sections_items]

# top-level images[] (all images across the page)
top_images = []
for s in sections:
    for im in s["images"]:
        top_images.append({"src": im["src"], "alt": im["alt"]})

page = {
    "url": BASE + "/azure-kubernetes-service/",
    "meta": {
        "title": "Azure Kubernetes Service for Enterprise App Modernization",
        "description": "Modernize legacy .NET and Java monoliths onto Azure Kubernetes Service "
                       "without a rip-and-replace. Governed, downtime-free migration from a Tier-1 "
                       "Microsoft CSP.",
        "canonical": BASE + "/azure-kubernetes-service/",
        "ogImage": HERO,
        "h1Count": 1,
    },
    "sections": sections,
    "images": top_images,
    "bgImages": [],
}

out = os.path.join(os.path.dirname(__file__), "..", "azure-clone-next",
                   "content-kit", "content", "azure_kubernetes_service.json")
out = os.path.abspath(out)
with open(out, "w", encoding="utf-8") as f:
    json.dump(page, f, ensure_ascii=False, indent=2)
    f.write("\n")
print("wrote", out)
print("sections:", len(sections))
# quick self-check: count headings/paras
th = sum(len(s["headings"]) for s in sections)
tp = sum(len(s["paragraphs"]) for s in sections)
print("total headings:", th, "total paragraphs:", tp)
