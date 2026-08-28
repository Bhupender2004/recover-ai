import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    KeepTogether,
    HRFlowable,
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748B"))
        
        # Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(54, 11 * inch - 36, "RecoverAI — Business Value & Product Explanation")
            self.drawRightString(8.5 * inch - 54, 11 * inch - 36, "AI Payment Recovery Intelligence")
            self.setStrokeColor(colors.HexColor("#CBD5E1"))
            self.setLineWidth(0.5)
            self.line(54, 11 * inch - 42, 8.5 * inch - 54, 11 * inch - 42)

        # Footer
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(8.5 * inch - 54, 36, page_text)
        self.drawString(54, 36, "CONFIDENTIAL & PROPRIETARY — RecoverAI Decision Infrastructure")
        self.setStrokeColor(colors.HexColor("#CBD5E1"))
        self.setLineWidth(0.5)
        self.line(54, 46, 8.5 * inch - 54, 46)
        
        self.restoreState()

def build_pdf(filename):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54,
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    primary_color = colors.HexColor("#0F172A")
    blue_accent = colors.HexColor("#2563EB")
    emerald_color = colors.HexColor("#059669")
    dark_gray = colors.HexColor("#334155")
    light_bg = colors.HexColor("#F8FAFC")
    border_color = colors.HexColor("#E2E8F0")

    title_style = ParagraphStyle(
        "DocTitle",
        parent=styles["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=24,
        leading=28,
        textColor=primary_color,
        spaceAfter=4,
    )

    subtitle_style = ParagraphStyle(
        "DocSubtitle",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=11,
        leading=15,
        textColor=colors.HexColor("#475569"),
        spaceAfter=14,
    )

    h1_style = ParagraphStyle(
        "SectionH1",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=13,
        leading=17,
        textColor=blue_accent,
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True,
    )

    h2_style = ParagraphStyle(
        "SectionH2",
        parent=styles["Heading3"],
        fontName="Helvetica-Bold",
        fontSize=10.5,
        leading=14,
        textColor=primary_color,
        spaceBefore=8,
        spaceAfter=4,
        keepWithNext=True,
    )

    body_style = ParagraphStyle(
        "DocBody",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=9,
        leading=13,
        textColor=dark_gray,
        spaceAfter=6,
    )

    bullet_style = ParagraphStyle(
        "DocBullet",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=9,
        leading=13,
        textColor=dark_gray,
        leftIndent=14,
        spaceAfter=3,
    )

    callout_style = ParagraphStyle(
        "DocCallout",
        parent=styles["Normal"],
        fontName="Helvetica-Oblique",
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor("#1E293B"),
    )

    table_header_style = ParagraphStyle(
        "TableHeader",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=8.5,
        leading=11,
        textColor=colors.white,
    )

    table_cell_style = ParagraphStyle(
        "TableCell",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8,
        leading=11,
        textColor=dark_gray,
    )

    table_cell_bold = ParagraphStyle(
        "TableCellBold",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=8,
        leading=11,
        textColor=primary_color,
    )

    story = []

    # Title Banner Block
    banner_data = [
        [
            Paragraph("<b>RECOVERAI</b> &bull; AI-POWERED PAYMENT RECOVERY INTELLIGENCE", ParagraphStyle("MiniTop", fontName="Helvetica-Bold", fontSize=8, textColor=blue_accent, leading=10)),
        ],
        [
            Paragraph("Business Value & Product Explanation", title_style),
        ],
        [
            Paragraph("Understanding the Problem, Solution, Users, AI Decision Process, and Business Impact", subtitle_style),
        ],
    ]
    banner_table = Table(banner_data, colWidths=[504])
    banner_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), light_bg),
        ('BOX', (0, 0), (-1, -1), 1, border_color),
        ('PADDING', (0, 0), (-1, -1), 12),
        ('BOTTOMPADDING', (0, -1), (-1, -1), 10),
    ]))
    story.append(banner_table)
    story.append(Spacer(1, 10))

    # 1. Executive Summary
    story.append(Paragraph("1. Executive Summary", h1_style))
    story.append(Paragraph(
        "<b>RecoverAI</b> is a B2B AI-powered payment recovery intelligence and decision engine. When modern digital businesses, subscription services, e-commerce stores, and fintech platforms experience failed payments, RecoverAI systematically analyzes historical transaction patterns, customer longevity, and technical decline codes. It predicts the exact <b>probability of recovery</b>, computes the <b>expected recoverable revenue</b>, and prescribes the optimal next operational action.",
        body_style
    ))
    story.append(Paragraph(
        "Its core purpose is simple: <i>help businesses decide which failed payments are worth pursuing and what intervention should be taken next</i>—eliminating blind retries and maximizing net recovered funds.",
        body_style
    ))

    # 2. The Problem
    story.append(Paragraph("2. The Problem: Revenue Leakage & Inefficient Recovery", h1_style))
    story.append(Paragraph(
        "Every year, businesses lose millions to failed payments across credit cards, UPI, digital wallets, and bank transfers. Traditional payment operations rely on static retry schedules (e.g., automated retry every 24 hours) or blanket reminder emails. This crude approach causes three major issues:",
        body_style
    ))
    story.append(Paragraph("&bull; <b>Wasted Gateway Fees & Network Fatigue:</b> Repeatedly retrying hard declines that have 0% chance of clearing.", bullet_style))
    story.append(Paragraph("&bull; <b>Customer Friction & Churn:</b> Bombarding reliable customers with aggressive failure notices over temporary network timeouts.", bullet_style))
    story.append(Paragraph("&bull; <b>Unfocused Recovery Teams:</b> Treating a high-value recurring enterprise customer failure identically to a low-intent one-off decline.", bullet_style))

    # 3. Who Is RecoverAI For?
    story.append(Paragraph("3. Who Is RecoverAI For?", h1_style))
    story.append(Paragraph(
        "<b>PRIMARY USER (B2B):</b> Payment operations teams, revenue recovery specialists, fintechs, SaaS businesses, marketplaces, and subscription merchants processing high transaction volumes.",
        body_style
    ))
    story.append(Paragraph(
        "<b>SECONDARY BENEFICIARY (Consumers & End-Users):</b> Individual customers do <i>not</i> directly use or log into RecoverAI. Instead, they benefit <b>indirectly</b> through a smoother, less spammy, and more empathetic payment recovery process orchestrated by the merchant.",
        body_style
    ))

    # 4 & 5. Benefits Summary Table
    story.append(Paragraph("4 & 5. Stakeholder Benefits Breakdown", h1_style))
    benefits_data = [
        [
            Paragraph("Business Benefits (Primary)", table_header_style),
            Paragraph("Customer Experience Benefits (Indirect)", table_header_style),
        ],
        [
            Paragraph("<b>&bull; Recover More Revenue:</b> Accurately identify and salvage high-yield failed transactions.", table_cell_style),
            Paragraph("<b>&bull; Fewer Unnecessary Retries:</b> Drastically reduces repeat charge attempts and account locks.", table_cell_style),
        ],
        [
            Paragraph("<b>&bull; Prioritize by Expected Value:</b> Rank queue by Amount &times; Probability to maximize recovery yield.", table_cell_style),
            Paragraph("<b>&bull; Context-Aware Interventions:</b> Receive a frictionless payment link or subtle reminder instead of debt warnings.", table_cell_style),
        ],
        [
            Paragraph("<b>&bull; Reduced Operational Waste:</b> Cease manual investigation on unrecoverable lost causes.", table_cell_style),
            Paragraph("<b>&bull; Frictionless Flow:</b> Easy 1-click update links for expired cards and 3DS authentication drops.", table_cell_style),
        ],
        [
            Paragraph("<b>&bull; Scalable Decision Automation:</b> API-driven inference replaces manual spreadsheet triage.", table_cell_style),
            Paragraph("<b>&bull; Higher Satisfaction:</b> Protects brand relationship and avoids aggressive communication.", table_cell_style),
        ],
    ]
    benefits_table = Table(benefits_data, colWidths=[248, 256])
    benefits_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, 0), blue_accent),
        ('BACKGROUND', (1, 0), (1, 0), colors.HexColor("#0D9488")),
        ('GRID', (0, 0), (-1, -1), 0.5, border_color),
        ('PADDING', (0, 0), (-1, -1), 6),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [light_bg, colors.white]),
    ]))
    story.append(benefits_table)
    story.append(Spacer(1, 8))

    # 6. How RecoverAI Works
    story.append(Paragraph("6. How RecoverAI Works (End-to-End Flow)", h1_style))
    story.append(Paragraph(
        "RecoverAI processes payment failures through a structured 7-stage decision loop:",
        body_style
    ))
    flow_text = "<b>Failed Payment</b> &rarr; <b>Context Ingestion</b> &rarr; <b>ML Prediction</b> &rarr; <b>Recovery Probability</b> &rarr; <b>Expected Recovery (EV)</b> &rarr; <b>Decision Engine</b> &rarr; <b>Targeted Action</b>"
    flow_box = Table([[Paragraph(flow_text, ParagraphStyle("FlowStyle", fontName="Helvetica-Bold", fontSize=8.5, textColor=primary_color, alignment=1))]], colWidths=[504])
    flow_box.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#EFF6FF")),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#93C5FD")),
        ('PADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(flow_box)
    story.append(Spacer(1, 8))

    # 7. Explain Every Input
    story.append(Paragraph("7. Data Inputs: Purpose, Rationale & Acquisition", h1_style))
    inputs_data = [
        [
            Paragraph("Field Name", table_header_style),
            Paragraph("What Does It Mean?", table_header_style),
            Paragraph("Why RecoverAI Needs It", table_header_style),
            Paragraph("How a Business Obtains It", table_header_style),
        ],
        [
            Paragraph("<b>Payment ID</b>", table_cell_bold),
            Paragraph("Unique transaction identifier.", table_cell_style),
            Paragraph("Tracking & audit trail.", table_cell_style),
            Paragraph("Payment gateway webhook / log.", table_cell_style),
        ],
        [
            Paragraph("<b>Amount (INR)</b>", table_cell_bold),
            Paragraph("Value of the failed charge.", table_cell_style),
            Paragraph("Expected recovery calculation (EV).", table_cell_style),
            Paragraph("Order checkout payload.", table_cell_style),
        ],
        [
            Paragraph("<b>Payment Method</b>", table_cell_bold),
            Paragraph("Rail: UPI, Card, NetBanking, Wallet.", table_cell_style),
            Paragraph("Rail-specific failure dynamics.", table_cell_style),
            Paragraph("Gateway checkout metadata.", table_cell_style),
        ],
        [
            Paragraph("<b>Failure Reason</b>", table_cell_bold),
            Paragraph("Decline code (timeout, 3DS, balance).", table_cell_style),
            Paragraph("Primary determinant of reversibility.", table_cell_style),
            Paragraph("Gateway error code / decline status.", table_cell_style),
        ],
        [
            Paragraph("<b>Customer LTV</b>", table_cell_bold),
            Paragraph("Cumulative historical spend.", table_cell_style),
            Paragraph("Prioritizing high-lifetime accounts.", table_cell_style),
            Paragraph("Internal billing / CRM database.", table_cell_style),
        ],
        [
            Paragraph("<b>Previous Payments</b>", table_cell_bold),
            Paragraph("Total lifetime transaction attempts.", table_cell_style),
            Paragraph("Baseline customer payment maturity.", table_cell_style),
            Paragraph("User transaction history ledger.", table_cell_style),
        ],
        [
            Paragraph("<b>Success Count</b>", table_cell_bold),
            Paragraph("Historical successful payments.", table_cell_style),
            Paragraph("Calculates historical reliability rate.", table_cell_style),
            Paragraph("Aggregated customer account data.", table_cell_style),
        ],
        [
            Paragraph("<b>Failed Count</b>", table_cell_bold),
            Paragraph("Historical failed payments.", table_cell_style),
            Paragraph("Identifies chronic failure patterns.", table_cell_style),
            Paragraph("Aggregated customer account data.", table_cell_style),
        ],
        [
            Paragraph("<b>Average Amount</b>", table_cell_bold),
            Paragraph("Customer's mean payment size.", table_cell_style),
            Paragraph("Detects anomaly spikes vs normal spend.", table_cell_style),
            Paragraph("Rolling average calculation.", table_cell_style),
        ],
        [
            Paragraph("<b>Recent Failures</b>", table_cell_bold),
            Paragraph("Failures within last 7&ndash;30 days.", table_cell_style),
            Paragraph("Flags active friction / expired cards.", table_cell_style),
            Paragraph("Time-windowed event query.", table_cell_style),
        ],
    ]
    inputs_table = Table(inputs_data, colWidths=[80, 140, 144, 140])
    inputs_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), primary_color),
        ('GRID', (0, 0), (-1, -1), 0.5, border_color),
        ('PADDING', (0, 0), (-1, -1), 4.5),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [light_bg, colors.white]),
    ]))
    story.append(inputs_table)
    story.append(Spacer(1, 8))

    # 8 & 9. Probability & Expected Recovery
    story.append(Paragraph("8 & 9. Recovery Probability & Expected Recovery Metric", h1_style))
    story.append(Paragraph(
        "<b>Recovery Probability:</b> A machine learning predicted confidence score (0.0% to 100.0%) indicating the statistical likelihood that this specific failed transaction can be successfully recovered if appropriate intervention is taken. <i>Note: Probability is a calibrated statistical estimate, not a legal guarantee.</i>",
        body_style
    ))
    story.append(Paragraph(
        "<b>Expected Recovery Formula:</b>",
        h2_style
    ))
    ev_formula = "<b>Expected Recovery Value (INR) = Failed Payment Amount &times; Recovery Probability</b>"
    ev_box = Table([[Paragraph(ev_formula, ParagraphStyle("EvStyle", fontName="Helvetica-Bold", fontSize=9, textColor=emerald_color, alignment=1))]], colWidths=[504])
    ev_box.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#ECFDF5")),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#A7F3D0")),
        ('PADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(ev_box)
    story.append(Paragraph(
        "<b>Important Financial Definition:</b> Expected Recovery is an operational <i>prioritization metric</i> used to sort queues. It is <u>not</u> guaranteed cash, and the non-recovered difference is <u>not</u> an accounting write-off.",
        body_style
    ))

    # 10 & 11. Actions & Confidence
    story.append(Paragraph("10 & 11. Recommended Actions & Confidence Levels", h1_style))
    actions_data = [
        [
            Paragraph("Recommended Action", table_header_style),
            Paragraph("Trigger Conditions & Business Rationales", table_header_style),
            Paragraph("Confidence Level", table_header_style),
        ],
        [
            Paragraph("<b>RETRY</b>", table_cell_bold),
            Paragraph("High probability (&ge;80%) & temporary errors (timeouts, network drops). Safe for silent auto-retry.", table_cell_style),
            Paragraph("<font color='#059669'><b>High Confidence</b></font>", table_cell_style),
        ],
        [
            Paragraph("<b>PAYMENT_LINK</b>", table_cell_bold),
            Paragraph("Authentication drop-offs (3DS). Customer action required; send frictionless link.", table_cell_style),
            Paragraph("<font color='#059669'><b>High Confidence</b></font>", table_cell_style),
        ],
        [
            Paragraph("<b>REMINDER</b>", table_cell_bold),
            Paragraph("Moderate probability (&ge;55%) or insufficient funds on loyal accounts. Low-friction nudge.", table_cell_style),
            Paragraph("<font color='#2563EB'><b>Medium Confidence</b></font>", table_cell_style),
        ],
        [
            Paragraph("<b>ESCALATE</b>", table_cell_bold),
            Paragraph("Uncertain probability or high-ticket accounts with repeated drops. Route to human ops.", table_cell_style),
            Paragraph("<font color='#D97706'><b>Low Confidence</b></font>", table_cell_style),
        ],
        [
            Paragraph("<b>NO_ACTION</b>", table_cell_bold),
            Paragraph("Low probability (&lt;40%) or maximum attempts exhausted. Cease intervention to save fees.", table_cell_style),
            Paragraph("<font color='#64748B'><b>High Confidence</b></font>", table_cell_style),
        ],
    ]
    actions_table = Table(actions_data, colWidths=[110, 294, 100])
    actions_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), primary_color),
        ('GRID', (0, 0), (-1, -1), 0.5, border_color),
        ('PADDING', (0, 0), (-1, -1), 5),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [light_bg, colors.white]),
    ]))
    story.append(actions_table)
    story.append(Spacer(1, 8))

    # 12 & 13. Real-World Example & Scale
    story.append(Paragraph("12 & 13. Real-World Example & Enterprise Scale Simulation", h1_style))
    story.append(Paragraph(
        "<b>Scenario Walkthrough:</b> A payment of <b>INR 5,000</b> fails due to a gateway `timeout`. The customer has completed 8 out of 10 historical orders with an LTV of INR 100,000. RecoverAI predicts an <b>85.3% recovery probability</b> &rarr; computes an <b>Expected Recovery of INR 4,265</b> &rarr; prescribes an immediate <b>RETRY</b>. The merchant automatically re-submits the charge silently without bothering the customer.",
        body_style
    ))
    story.append(Paragraph(
        "<b>At Enterprise Scale (100,000 Failed Payments/Month):</b> Instead of brute-force retrying all 100,000 items (incurring gateway decline fees and customer annoyance), RecoverAI segments the volume: identifying the top 35,000 high-confidence retries, generating 15,000 payment links, issuing 10,000 reminders, and instantly dropping 40,000 low-yield transactions.",
        body_style
    ))

    # 14 & 15. Technical Architecture & Current Scope
    story.append(Paragraph("14 & 15. Technical Architecture & Product Scope Notice", h1_style))
    story.append(Paragraph(
        "<b>Technical Stack:</b> Next.js 16 + React 19 + TypeScript frontend &bull; Python FastAPI backend &bull; Scikit-Learn / XGBoost classification pipeline &bull; Rule-guided Expected Value decision engine.",
        body_style
    ))
    scope_text = "<b>DEVELOPMENT / DEMO SCOPE NOTICE:</b> RecoverAI is an analytical intelligence decision support system. It does NOT directly debit bank accounts, execute live financial settlements, store raw payment tokens, or send automated SMS/emails. It generates high-precision recommendations for integration into payment pipelines."
    scope_box = Table([[Paragraph(scope_text, ParagraphStyle("ScopeStyle", fontName="Helvetica", fontSize=8, textColor=colors.HexColor("#991B1B"), leading=11))]], colWidths=[504])
    scope_box.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#FEF2F2")),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#FCA5A5")),
        ('PADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(scope_box)
    story.append(Spacer(1, 8))

    # 16 & 17. Future Potential & Summary
    story.append(Paragraph("16 & 17. Future Potential & Conclusion", h1_style))
    story.append(Paragraph(
        "<b>Future Enhancements:</b> Direct Stripe/Razorpay webhook ingestion &bull; Automated dunning orchestration &bull; Continuous model calibration &bull; Strategy A/B testing &bull; Multi-gateway routing.",
        body_style
    ))
    story.append(Paragraph(
        "<b>Final Summary:</b> RecoverAI turns failed payments from a simple failure signal into an actionable recovery opportunity through a unified loop: <b>Predict &rarr; Prioritize &rarr; Recommend &rarr; Recover</b>.",
        ParagraphStyle("FinalText", fontName="Helvetica-Bold", fontSize=9.5, leading=14, textColor=primary_color)
    ))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated PDF at: {filename}")

if __name__ == "__main__":
    pdf_path = os.path.join("frontend", "public", "recoverai-business-value.pdf")
    build_pdf(pdf_path)
