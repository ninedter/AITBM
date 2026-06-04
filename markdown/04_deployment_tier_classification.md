# Deployment Tier Classification

Deployment tiers eliminate subjective weight selection. Organizations classify each AI deployment into exactly one tier, and all weights, thresholds, and decay constants are deterministically derived.

*Table 44: 4. Deployment Tier Classification*

| Tier | Definition | Examples | Cadence |
| --- | --- | --- | --- |
| Tier 1: Critical | Failure causes immediate physical, financial, or societal harm at scale | Autonomous trading, medical diagnosis, infrastructure control | Continuous + quarterly |
| Tier 2: Consumer | Direct public interaction; exploitation affects individuals | Customer chatbots, content recommendation, hiring AI | Monthly + semi-annual |
| Tier 3: Internal | Within organizational boundaries with controlled users | Code assistants, document summarization, workflow automation | Quarterly + annual |
| Tier 4: Research | Non-production: development, testing, experimentation | Prototyping, academic research, sandboxed experiments | Annual |

## 4.1 IVP Weight Profiles (W_ivp)

IVP axis weights are deployment-architecture-specific. The following profiles are applied when compositing the IVP score across the five axes.

*Table 45: 4.1 IVP Weight Profiles (W_ivp)*

| Axis | Tier 1 | Tier 2 | Tier 3 | Tier 4 |
| --- | --- | --- | --- | --- |
| Robustness | 0.30 | 0.25 | 0.20 | 0.15 |
| Fairness | 0.25 | 0.30 | 0.15 | 0.10 |
| Transparency | 0.15 |  | 0.20 | 0.30 |
| Privacy | 0.20 |  | 0.25 | 0.15 |
| Containment | 0.10 |  | 0.20 | 0.30 |
| Sum | 1.00 |  |  |  |

## 4.2 ORP Weight Profiles (W_orp)

ORP dimension weights are deployment-architecture-specific. The following profiles are applied when compositing the ORP score across the four dimensions.

*Table 46: 4.2 ORP Weight Profiles (W_orp)*

| Dimension | Tier 1 | Tier 2 | Tier 3 | Tier 4 |
| --- | --- | --- | --- | --- |
| Autonomy Amp. | 0.35 | 0.25 | 0.20 | 0.15 |
| Attack Surface | 0.25 | 0.35 | 0.25 | 0.20 |
| Cascade Potential | 0.25 | 0.20 | 0.30 | 0.25 |
| Remediation Feas. | 0.15 | 0.20 | 0.25 | 0.40 |
| Sum | 1.00 |  |  |  |

## 4.3 ACI Weight Profile (W_aci)

ACI uses a fixed component weight profile across deployment tiers. This is intentional after explicit definition: tier sensitivity is already captured through the Temporal Freshness (Tf) decay constants, event caps, monitoring caps, and reassessment cadence. Re-weighting Pc, Ec, and Tf by tier would double-count deployment criticality and would break comparability across assessments.

ACI weighted geometric mean:

```
ACI_(composite) = Pc^(w_(pc)) × Ec^(w_(ec)) × Tf^(w_(tf)),wherew_(pc)+w_(ec)+w_(tf) = 1.00
```

Basis. This is the general form of the ACI composite, allowing component weights while keeping the geometric-mean structure. In this release every weight is fixed at one-third, so it reduces to the cube-root form in Section 3.3.4.

Variables. w_pc, w_ec, and w_tf are the weights of Provenance Completeness, Evaluation Coverage, and Temporal Freshness; they sum to 1.00. With equal weights the expression is the cube root of the product Pc x Ec x Tf.

Why this form. A weighted geometric mean preserves the weakest-link behavior of the equal-weight version while leaving room for future, empirically justified re-weighting. The weights are held equal and tier-independent on purpose: deployment criticality is already carried by Tf through its decay constant and caps, so moving it into the ACI weights as well would count the same factor twice and make scores from different tiers no longer comparable.

Table: 4.3 ACI Weight Profile (W_aci)

*Table 47: 4.3 ACI Weight Profile (W_aci)*

| ACI Component | Tier 1 | Tier 2 | Tier 3 | Tier 4 | Rationale |
| --- | --- | --- | --- | --- | --- |
| Provenance Completeness (Pc) | 1/3 |  |  |  | Unknown model, data, tool, or identity provenance undermines confidence at every tier. |
| Evaluation Coverage (Ec) | 1/3 |  |  |  | Incomplete testing cannot be offset by fresh telemetry or strong provenance. |
| Temporal Freshness (Tf) | 1/3 |  |  |  | Freshness is equally weighted, while tier-specific urgency is applied through lambda and caps. |
| Sum | 1.00 |  |  |  | Weights are fixed to preserve cross-tier comparability. |

Operational Rule: Deployment tier changes Tf behavior, not W_aci. Tier 1 systems decay faster and face stricter event and monitoring caps; Tier 4 systems decay more slowly. The component composition remains equal because Pc, Ec, and Tf represent independent assurance prerequisites.

## 4.4 Architecture Classification Decision Tree

The assessor answers the following questions in order. The first YES answer assigns the architecture class. If all questions are answered NO until Q6, classify the system as Traditional ML / Classifier. Evidence for each answer must be documented in the assessment workpapers.

Table: 4.4 Architecture Classification Decision Tree

*Table 48: 4.4 Architecture Classification Decision Tree*

| Question | Classification if YES | Required Evidence | Examples |
| --- | --- | --- | --- |
| Q1. Does the system contain two or more AI agents that coordinate, delegate tasks, share memory, exchange messages, or use shared tools to complete a goal? | Multi-Agent / MCP System | Agent topology, orchestration diagram, inter-agent message flows, shared memory design, tool registry, and identity boundaries. | Supervisor-worker agents, agent swarms, MCP-based multi-agent workflow, autonomous SOC triage agents. |
| Q2. Can the system autonomously plan or execute a multi-step workflow, maintain task state or memory, or invoke tools/connectors without explicit human approval for each action? | Agentic / MCP System | Planner or agent loop design, tool permission matrix, memory store, MCP/plugin configuration, approval rules, and audit logs. | Financial advisory agent with tool calls, coding agent, travel-booking agent, workflow automation agent. |
| Q3. Does the model call external functions, APIs, plugins, MCP tools, code interpreters, browsers, databases, or enterprise connectors, even if execution is user-triggered or single-step? | Tool-Calling LLM / Connected GenAI | Function schema, connector inventory, API scopes, execution policy, tool-call logs, and data-flow diagram. | Chatbot that calls CRM APIs, LLM with SQL tool, assistant with browser or code execution. |
| Q4. Does the system retrieve external or mutable context at inference time from a vector store, search index, knowledge base, document corpus, database, or other retrieval layer? | RAG / Retrieval-Augmented System | Corpus manifest, retrieval pipeline, embedding/index configuration, source authorization model, retrieval logs, and freshness controls. | Policy assistant over internal documents, support chatbot using vector search, legal summarizer over a document repository. |
| Q5. Does the system generate open-ended natural language, code, images, audio, video, or other probabilistic content without external retrieval or tool execution? | Standalone LLM / Generative AI | Model card, prompt template, inference endpoint, safety controls, and confirmation that retrieval/tool execution is not used. | Prompt-response LLM, standalone image generator, offline summarization model with static prompt context. |
| Q6. Is the system a bounded predictive or classification model using fixed feature inputs and deterministic application logic, with no generative interface, retrieval layer, tool execution, or autonomous planning? | Traditional ML / Classifier | Feature schema, model card, inference pipeline, application logic, and confirmation that no generative or agentic component is in scope. | Fraud classifier, churn predictor, credit risk scorecard, image classifier. |

Hybrid System Rule

Systems spanning multiple categories are classified by the highest-risk qualifying architecture. Order: Multi-Agent / MCP > Agentic / MCP > Tool-Calling LLM > RAG > Standalone LLM / GenAI > Traditional ML / Classifier. Components excluded from scope must be documented with an explicit boundary statement.

Table: 4.4 Architecture Weighting Guidance

*Table 49: 4.4 Architecture Classification Decision Tree*

| Architecture Class | Primary Risk Emphasis | Weighting Guidance |
| --- | --- | --- |
| Traditional ML / Classifier | Data quality, robustness, calibration, fairness, privacy. | Apply baseline IVP/ORP weights. Agent-specific sub-metrics may be marked NOT APPLICABLE only when no tool, retrieval, or autonomous component exists. |
| Standalone LLM / Generative AI | Prompt injection, adversarial inputs, hallucination, output filtering, privacy leakage. | Increase Robustness and Transparency emphasis. Containment remains applicable for output boundaries and policy enforcement. |
| RAG / Retrieval-Augmented System | Corpus poisoning, retrieval manipulation, provenance, privacy leakage, stale or unauthorized context. | Increase Robustness, Privacy, and Transparency emphasis. Require RAG provenance and retrieval drift evidence in ACI. |
| Tool-Calling LLM / Connected GenAI | Tool poisoning, excessive permission, unsafe API invocation, auditability, data exfiltration. | Increase Containment and Transparency emphasis. Cn-1, Cn-2, Cn-3, Tr-3, and Ro-4 are mandatory unless formally out of scope. |
| Agentic / MCP System | Autonomous goal drift, multi-step escalation, memory poisoning, identity spoofing, MCP/tool supply chain. | Apply agentic weights. Cn-1 through Cn-5 are mandatory; ORP Attack Surface and Cascade Potential must account for tool authority and autonomy. |
| Multi-Agent / MCP System | Cross-agent collusion, cascading failure, shared-memory poisoning, delegated authority, identity boundary failure. | Apply highest-risk agentic weights plus explicit ORP cascade review. Cn-5, Tr-3, Cn-2, and ACI drift monitoring are mandatory. |

Classification Output Format

Assessors must record: Architecture Class, YES question number, evidence artifacts reviewed, excluded components, and rationale for any NOT APPLICABLE sub-metric. Example: Architecture Classification: Agentic / MCP System (Q2 = YES; autonomous multi-step financial workflow with RAG and tool calls; evidence: tool registry, approval policy, execution logs).

Weight Derivation Basis

Architecture-specific weights are deterministic after classification. They are derived from the deployment tier, architecture class, and mandatory applicability rules above; assessors may not manually adjust weights outside the documented NOT APPLICABLE redistribution rule.
