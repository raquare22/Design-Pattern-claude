import { useState } from "react";

const C = {
  bg: "#0b0b1a",
  surface: "#111128",
  border: "#1e1e40",
  accent: "#00e5a0",
  pink: "#ff4d8d",
  yellow: "#ffc244",
  blue: "#5b9dff",
  purple: "#b07dff",
  text: "#d8dce6",
  dim: "#6b7394",
  code_bg: "#0d0d24",
};

function Box({ children, color = C.accent, bg, style = {} }) {
  return (
    <div style={{ padding: "16px 20px", borderRadius: "10px", background: bg || `${color}0a`, border: `1.5px solid ${color}33`, color: C.text, fontSize: "14px", lineHeight: 1.7, ...style }}>
      {children}
    </div>
  );
}

function Code({ code, title }) {
  return (
    <div style={{ margin: "16px 0", borderRadius: "10px", overflow: "hidden", border: `1px solid ${C.border}` }}>
      {title && (
        <div style={{ background: "#0a0a20", padding: "8px 14px", fontSize: "12px", color: C.dim, fontFamily: "monospace", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f56" }} />
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ffbd2e" }} />
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#27c93f" }} />
          <span style={{ marginLeft: 6 }}>{title}</span>
        </div>
      )}
      <pre style={{ background: C.code_bg, padding: "18px", margin: 0, overflowX: "auto", fontSize: "13px", lineHeight: 1.8, fontFamily: "'JetBrains Mono', Consolas, monospace" }}>
        <code dangerouslySetInnerHTML={{ __html: code }} />
      </pre>
    </div>
  );
}

function Diagram({ title, children }) {
  return (
    <div style={{ margin: "20px 0", padding: "24px", background: `linear-gradient(135deg, ${C.surface}, #0f0f30)`, borderRadius: "14px", border: `1px solid ${C.border}` }}>
      {title && <div style={{ fontSize: "13px", color: C.accent, marginBottom: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5 }}>{title}</div>}
      {children}
    </div>
  );
}

function Tag({ children, color = C.accent }) {
  return <span style={{ display: "inline-block", padding: "3px 12px", borderRadius: 16, background: `${color}18`, color, fontSize: 11, fontWeight: 600, border: `1px solid ${color}33`, margin: 2 }}>{children}</span>;
}

function LineExplain({ lineNum, code, explain, jvm, color = C.accent }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ margin: "6px 0", borderRadius: 8, border: `1px solid ${open ? color + "55" : C.border}`, overflow: "hidden", transition: "all 0.2s" }}>
      <div onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", cursor: "pointer", background: open ? `${color}0d` : "transparent" }}>
        <span style={{ width: 28, height: 28, borderRadius: "50%", background: `${color}22`, color, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{lineNum}</span>
        <code style={{ fontFamily: "monospace", fontSize: 13, color: "#e0e0e0", flex: 1 }} dangerouslySetInnerHTML={{ __html: code }} />
        <span style={{ color: C.dim, fontSize: 18, transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "0.2s" }}>›</span>
      </div>
      {open && (
        <div style={{ padding: "12px 14px 14px 52px", borderTop: `1px solid ${C.border}` }}>
          <div style={{ color: C.text, fontSize: 13, lineHeight: 1.7, marginBottom: jvm ? 10 : 0 }}>
            <span style={{ color: C.yellow, fontWeight: 600 }}>📖 Plain English: </span>{explain}
          </div>
          {jvm && (
            <div style={{ color: C.text, fontSize: 13, lineHeight: 1.7, padding: "10px 14px", background: `${C.purple}0d`, borderRadius: 8, border: `1px solid ${C.purple}22` }}>
              <span style={{ color: C.purple, fontWeight: 600 }}>🧠 JVM Memory: </span>
              <span dangerouslySetInnerHTML={{ __html: jvm }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── SECTIONS ────────────────────────────────────────────

function Requirement() {
  return (
    <div>
      <h2 style={{ color: C.accent }}>📋 Your Practice Requirement</h2>
      <Diagram title="🎯 The Problem Statement">
        <div style={{ fontSize: 16, color: C.text, lineHeight: 1.8 }}>
          You are building a <strong style={{ color: C.yellow }}>Document Exporter</strong> for an office app.<br />
          Users can export documents in different formats:
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
          {[
            { fmt: "PDF", icon: "📕", desc: "Generates a .pdf file with headers and footers" },
            { fmt: "Word", icon: "📘", desc: "Generates a .docx file with formatted text" },
            { fmt: "Excel", icon: "📗", desc: "Generates a .xlsx file with tabular data" },
          ].map((f, i) => (
            <Box key={i} color={[C.pink, C.blue, C.accent][i]} style={{ flex: "1 1 200px" }}>
              <div style={{ fontSize: 28 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, color: [C.pink, C.blue, C.accent][i], fontSize: 16 }}>{f.fmt} Exporter</div>
              <div style={{ color: C.dim, fontSize: 13 }}>{f.desc}</div>
            </Box>
          ))}
        </div>
      </Diagram>

      <Diagram title="📝 Requirements">
        <div style={{ display: "grid", gap: 10 }}>
          {[
            "All exporters must have a method: export(String content)",
            "All exporters must have a method: getFileExtension()",
            "A Factory should create the right exporter based on a string like \"pdf\", \"word\", \"excel\"",
            "Client code should NEVER use 'new PdfExporter()' directly",
            "Adding a new format (e.g., HTML) should be easy — minimal changes",
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ width: 24, height: 24, borderRadius: "50%", background: `${C.accent}22`, color: C.accent, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</span>
              <span style={{ color: C.text, fontSize: 14 }}>{r}</span>
            </div>
          ))}
        </div>
      </Diagram>

      <Diagram title="🧪 Try it Yourself First!">
        <Box color={C.yellow}>
          <strong style={{ color: C.yellow }}>⏸️ PAUSE HERE</strong> — Before looking at the solution, try to:
          <div style={{ marginTop: 8, display: "grid", gap: 6 }}>
            <div>1. Create the <code style={{ color: C.accent }}>DocumentExporter</code> interface</div>
            <div>2. Create 3 concrete classes: <code style={{ color: C.pink }}>PdfExporter</code>, <code style={{ color: C.blue }}>WordExporter</code>, <code style={{ color: C.accent }}>ExcelExporter</code></div>
            <div>3. Create <code style={{ color: C.purple }}>ExporterFactory</code> with a static method</div>
            <div>4. Write a Main class that uses only the factory</div>
          </div>
        </Box>
      </Diagram>
    </div>
  );
}

function Solution() {
  return (
    <div>
      <h2 style={{ color: C.accent }}>✅ Complete Solution</h2>

      <Code title="DocumentExporter.java — The Interface (Contract)" code={`<span style="color:${C.dim}">// ═══════════════════════════════════════════════════════</span>
<span style="color:${C.dim}">// STEP 1: Define WHAT every exporter must be able to do</span>
<span style="color:${C.dim}">// This is the CONTRACT / BLUEPRINT / MENU</span>
<span style="color:${C.dim}">// ═══════════════════════════════════════════════════════</span>

<span style="color:${C.pink}">public interface</span> <span style="color:${C.accent}">DocumentExporter</span> {

    <span style="color:${C.accent}">String</span> <span style="color:${C.blue}">export</span>(<span style="color:${C.accent}">String</span> content);
    
    <span style="color:${C.accent}">String</span> <span style="color:${C.blue}">getFileExtension</span>();
}`} />

      <Code title="PdfExporter.java — Concrete Product #1" code={`<span style="color:${C.dim}">// ═══════════════════════════════════════════════════════</span>
<span style="color:${C.dim}">// STEP 2a: A REAL exporter — knows HOW to export as PDF</span>
<span style="color:${C.dim}">// ═══════════════════════════════════════════════════════</span>

<span style="color:${C.pink}">public class</span> <span style="color:${C.accent}">PdfExporter</span> <span style="color:${C.pink}">implements</span> <span style="color:${C.accent}">DocumentExporter</span> {

    <span style="color:${C.pink}">@Override</span>
    <span style="color:${C.pink}">public</span> <span style="color:${C.accent}">String</span> <span style="color:${C.blue}">export</span>(<span style="color:${C.accent}">String</span> content) {
        <span style="color:${C.pink}">return</span> <span style="color:${C.yellow}">"[PDF Header] "</span> + content + <span style="color:${C.yellow}">" [PDF Footer]"</span>;
    }

    <span style="color:${C.pink}">@Override</span>
    <span style="color:${C.pink}">public</span> <span style="color:${C.accent}">String</span> <span style="color:${C.blue}">getFileExtension</span>() {
        <span style="color:${C.pink}">return</span> <span style="color:${C.yellow}">".pdf"</span>;
    }
}`} />

      <Code title="WordExporter.java — Concrete Product #2" code={`<span style="color:${C.pink}">public class</span> <span style="color:${C.accent}">WordExporter</span> <span style="color:${C.pink}">implements</span> <span style="color:${C.accent}">DocumentExporter</span> {

    <span style="color:${C.pink}">@Override</span>
    <span style="color:${C.pink}">public</span> <span style="color:${C.accent}">String</span> <span style="color:${C.blue}">export</span>(<span style="color:${C.accent}">String</span> content) {
        <span style="color:${C.pink}">return</span> <span style="color:${C.yellow}">"[Word Doc] "</span> + content + <span style="color:${C.yellow}">" [End of Doc]"</span>;
    }

    <span style="color:${C.pink}">@Override</span>
    <span style="color:${C.pink}">public</span> <span style="color:${C.accent}">String</span> <span style="color:${C.blue}">getFileExtension</span>() {
        <span style="color:${C.pink}">return</span> <span style="color:${C.yellow}">".docx"</span>;
    }
}`} />

      <Code title="ExcelExporter.java — Concrete Product #3" code={`<span style="color:${C.pink}">public class</span> <span style="color:${C.accent}">ExcelExporter</span> <span style="color:${C.pink}">implements</span> <span style="color:${C.accent}">DocumentExporter</span> {

    <span style="color:${C.pink}">@Override</span>
    <span style="color:${C.pink}">public</span> <span style="color:${C.accent}">String</span> <span style="color:${C.blue}">export</span>(<span style="color:${C.accent}">String</span> content) {
        <span style="color:${C.pink}">return</span> <span style="color:${C.yellow}">"[Excel Sheet] | "</span> + content + <span style="color:${C.yellow}">" |"</span>;
    }

    <span style="color:${C.pink}">@Override</span>
    <span style="color:${C.pink}">public</span> <span style="color:${C.accent}">String</span> <span style="color:${C.blue}">getFileExtension</span>() {
        <span style="color:${C.pink}">return</span> <span style="color:${C.yellow}">".xlsx"</span>;
    }
}`} />

      <Code title="ExporterFactory.java — The Factory (Brain)" code={`<span style="color:${C.dim}">// ═══════════════════════════════════════════════════════</span>
<span style="color:${C.dim}">// STEP 3: The FACTORY — the only place that uses 'new'</span>
<span style="color:${C.dim}">// ═══════════════════════════════════════════════════════</span>

<span style="color:${C.pink}">public class</span> <span style="color:${C.accent}">ExporterFactory</span> {

    <span style="color:${C.pink}">public static</span> <span style="color:${C.accent}">DocumentExporter</span> <span style="color:${C.blue}">createExporter</span>(<span style="color:${C.accent}">String</span> type) {
    
        <span style="color:${C.pink}">switch</span> (type.toLowerCase()) {
            <span style="color:${C.pink}">case</span> <span style="color:${C.yellow}">"pdf"</span>:
                <span style="color:${C.pink}">return new</span> <span style="color:${C.accent}">PdfExporter</span>();
            <span style="color:${C.pink}">case</span> <span style="color:${C.yellow}">"word"</span>:
                <span style="color:${C.pink}">return new</span> <span style="color:${C.accent}">WordExporter</span>();
            <span style="color:${C.pink}">case</span> <span style="color:${C.yellow}">"excel"</span>:
                <span style="color:${C.pink}">return new</span> <span style="color:${C.accent}">ExcelExporter</span>();
            <span style="color:${C.pink}">default</span>:
                <span style="color:${C.pink}">throw new</span> <span style="color:${C.accent}">IllegalArgumentException</span>(
                    <span style="color:${C.yellow}">"Unknown export type: "</span> + type
                );
        }
    }
}`} />

      <Code title="Main.java — Client Code" code={`<span style="color:${C.dim}">// ═══════════════════════════════════════════════════════</span>
<span style="color:${C.dim}">// STEP 4: Client — clean, simple, decoupled</span>
<span style="color:${C.dim}">// ═══════════════════════════════════════════════════════</span>

<span style="color:${C.pink}">public class</span> <span style="color:${C.accent}">Main</span> {
    <span style="color:${C.pink}">public static void</span> <span style="color:${C.blue}">main</span>(<span style="color:${C.accent}">String</span>[] args) {
    
        <span style="color:${C.dim}">// Client NEVER writes: new PdfExporter()</span>
        <span style="color:${C.accent}">DocumentExporter</span> exporter = ExporterFactory.<span style="color:${C.blue}">createExporter</span>(<span style="color:${C.yellow}">"pdf"</span>);
        
        <span style="color:${C.accent}">String</span> result = exporter.<span style="color:${C.blue}">export</span>(<span style="color:${C.yellow}">"My Report Data"</span>);
        System.out.println(result);
        <span style="color:${C.dim}">// Output: [PDF Header] My Report Data [PDF Footer]</span>
        
        System.out.println(exporter.<span style="color:${C.blue}">getFileExtension</span>());
        <span style="color:${C.dim}">// Output: .pdf</span>
    }
}`} />
    </div>
  );
}

function LineByLine() {
  return (
    <div>
      <h2 style={{ color: C.accent }}>🔬 Line-by-Line Deep Dive</h2>
      <p style={{ color: C.dim, fontSize: 14, marginBottom: 16 }}>Click any line to expand its explanation + JVM memory details</p>

      <Diagram title="📄 DocumentExporter.java — The Interface">
        <LineExplain lineNum={1}
          code={`<span style="color:${C.pink}">public interface</span> <span style="color:${C.accent}">DocumentExporter</span> {`}
          explain={<><strong style={{color:C.yellow}}>interface</strong> = a contract. It says "any class that signs this contract MUST have these methods." Think of it like a job description — it defines WHAT you must do, but not HOW. <strong style={{color:C.pink}}>public</strong> means any class in any package can see and implement this interface.</>}
          jvm={`<strong>Method Area (Metaspace):</strong> JVM loads the bytecode of <code>DocumentExporter.interface</code> into the <span style="color:${C.purple}">Method Area</span>. No object is created on the Heap — interfaces don't have instances. JVM stores the interface's metadata: method signatures <code>export()</code> and <code>getFileExtension()</code>.`}
          color={C.pink}
        />
        <LineExplain lineNum={2}
          code={`    <span style="color:${C.accent}">String</span> <span style="color:${C.blue}">export</span>(<span style="color:${C.accent}">String</span> content);`}
          explain={<>This declares: "Every exporter MUST have an export method that takes a String and returns a String." No body (no curly braces) — because the interface doesn't say HOW, only WHAT. Each concrete class will write its own body.</>}
          jvm={`This is just a <span style="color:${C.purple}">method signature</span> stored in the interface's metadata in Method Area. No executable code here — it's a slot waiting to be filled by implementing classes.`}
          color={C.blue}
        />
        <LineExplain lineNum={3}
          code={`    <span style="color:${C.accent}">String</span> <span style="color:${C.blue}">getFileExtension</span>();`}
          explain={<>Same idea — every exporter must tell us its file extension (.pdf, .docx, .xlsx). Again, no body — just the promise that this method will exist.</>}
          color={C.blue}
        />
      </Diagram>

      <Diagram title="📕 PdfExporter.java — Concrete Class">
        <LineExplain lineNum={1}
          code={`<span style="color:${C.pink}">public class</span> <span style="color:${C.accent}">PdfExporter</span> <span style="color:${C.pink}">implements</span> <span style="color:${C.accent}">DocumentExporter</span> {`}
          explain={<><strong style={{color:C.yellow}}>class</strong> = a blueprint for creating objects. <strong style={{color:C.pink}}>implements DocumentExporter</strong> = "I am signing the contract. I PROMISE to have export() and getFileExtension() methods." If you forget even one method, Java compiler will SCREAM at you with an error.</>}
          jvm={`JVM loads <code>PdfExporter.class</code> into <span style="color:${C.purple}">Method Area</span>. It verifies during class loading that ALL interface methods are implemented. The class's <strong>vtable</strong> (virtual method table) is created — this is how JVM knows which method to call at runtime (polymorphism).`}
          color={C.accent}
        />
        <LineExplain lineNum={2}
          code={`    <span style="color:${C.pink}">@Override</span>`}
          explain={<><strong style={{color:C.yellow}}>@Override</strong> is an annotation — a note to the compiler saying "I intend to override a method from my parent interface/class." It's optional but HIGHLY recommended. If you accidentally misspell the method name, @Override will catch the error at compile time instead of at runtime.</>}
          color={C.yellow}
        />
        <LineExplain lineNum={3}
          code={`    <span style="color:${C.pink}">public</span> <span style="color:${C.accent}">String</span> <span style="color:${C.blue}">export</span>(<span style="color:${C.accent}">String</span> content) {`}
          explain={<>This is the ACTUAL implementation. Now we're writing the HOW — how does a PDF export work? The method takes <code>content</code> (whatever text the user wants to export) and returns a String. In real life, this would generate actual PDF bytes — we're simplifying with strings.</>}
          jvm={`The method's bytecode is stored in <span style="color:${C.purple}">Method Area</span> under PdfExporter's class data. When called, a new <strong>Stack Frame</strong> is pushed onto the calling thread's Stack with local variable <code>content</code>.`}
          color={C.blue}
        />
        <LineExplain lineNum={4}
          code={`        <span style="color:${C.pink}">return</span> <span style="color:${C.yellow}">"[PDF Header] "</span> + content + <span style="color:${C.yellow}">" [PDF Footer]"</span>;`}
          explain={<>We wrap the content with PDF-specific formatting (header and footer). The <code>+</code> operator concatenates (joins) the strings together. In real code, you'd use a PDF library like iText or Apache PDFBox here to generate actual PDF bytes.</>}
          jvm={`String concatenation with <code>+</code> creates new String objects on the <span style="color:${C.purple}">Heap</span>. The JVM internally uses <code>StringBuilder</code> for efficiency: <code>new StringBuilder("[PDF Header] ").append(content).append(" [PDF Footer]").toString()</code>. The returned String object lives on the Heap.`}
          color={C.yellow}
        />
      </Diagram>

      <Diagram title="🏭 ExporterFactory.java — The Factory">
        <LineExplain lineNum={1}
          code={`<span style="color:${C.pink}">public class</span> <span style="color:${C.accent}">ExporterFactory</span> {`}
          explain={<>The Factory class. This is the BRAIN of the pattern. It's the ONLY class that knows about PdfExporter, WordExporter, ExcelExporter. Nobody else needs to know they exist.</>}
          color={C.pink}
        />
        <LineExplain lineNum={2}
          code={`    <span style="color:${C.pink}">public static</span> <span style="color:${C.accent}">DocumentExporter</span> <span style="color:${C.blue}">createExporter</span>(<span style="color:${C.accent}">String</span> type) {`}
          explain={<><strong style={{color:C.yellow}}>public</strong> — anyone can call this. <strong style={{color:C.pink}}>static</strong> — you DON'T need to create an ExporterFactory object to call this method. You call it directly on the class: <code>ExporterFactory.createExporter("pdf")</code>. The return type is <code>DocumentExporter</code> (the INTERFACE, not a concrete class!) — this is KEY to the pattern.</>}
          jvm={`<strong style="color:${C.pink}">static keyword is HUGE in JVM:</strong><br/>• Static methods belong to the <strong>Class</strong>, not to any object<br/>• Stored in <span style="color:${C.purple}">Method Area (Metaspace)</span> — NOT on the Heap<br/>• No <code>this</code> reference — because there's no object<br/>• Loaded when the class is first loaded by ClassLoader<br/>• Only ONE copy exists regardless of how many times you call it<br/>• That's why you call it with <code>ClassName.method()</code> — no object needed`}
          color={C.accent}
        />
        <LineExplain lineNum={3}
          code={`        <span style="color:${C.pink}">switch</span> (type.toLowerCase()) {`}
          explain={<>Takes the input string and converts to lowercase (so "PDF", "pdf", "Pdf" all work). Then the switch statement acts as a DECISION MAKER — it picks which concrete class to instantiate based on the type string.</>}
          color={C.pink}
        />
        <LineExplain lineNum={4}
          code={`            <span style="color:${C.pink}">case</span> <span style="color:${C.yellow}">"pdf"</span>: <span style="color:${C.pink}">return new</span> <span style="color:${C.accent}">PdfExporter</span>();`}
          explain={<>If the type is "pdf", create a brand new PdfExporter object and return it. The <code>new</code> keyword triggers: (1) memory allocation on Heap, (2) constructor call, (3) returns the reference. Notice: the return type is <code>DocumentExporter</code> but we return a <code>PdfExporter</code> — this works because PdfExporter implements DocumentExporter (IS-A relationship).</>}
          jvm={`<strong>When <code>new PdfExporter()</code> executes:</strong><br/>1️⃣ JVM checks if PdfExporter class is loaded → if not, ClassLoader loads it into Method Area<br/>2️⃣ JVM allocates memory on the <span style="color:${C.purple}">Heap</span> for the new object<br/>3️⃣ All instance fields set to defaults (none here, but would be 0/null/false)<br/>4️⃣ Constructor <code>&lt;init&gt;</code> runs<br/>5️⃣ A <strong>reference</strong> (like a pointer/address) to this Heap object is returned<br/>6️⃣ This reference is what gets returned to the caller`}
          color={C.yellow}
        />
        <LineExplain lineNum={5}
          code={`            <span style="color:${C.pink}">default</span>: <span style="color:${C.pink}">throw new</span> <span style="color:${C.accent}">IllegalArgumentException</span>(...);`}
          explain={<>If someone passes "html" or "banana" — we THROW an exception. This is called "fail fast" — crash immediately with a clear error instead of returning null (which would cause a confusing NullPointerException later). Always handle the default case!</>}
          jvm={`<code>new IllegalArgumentException()</code> creates an Exception object on the Heap. When thrown, JVM unwinds the Stack — popping frames until it finds a matching catch block. If none found, the thread dies and JVM prints the stack trace.`}
          color={C.pink}
        />
      </Diagram>

      <Diagram title="🚀 Main.java — Client Code">
        <LineExplain lineNum={1}
          code={`<span style="color:${C.accent}">DocumentExporter</span> exporter = ExporterFactory.<span style="color:${C.blue}">createExporter</span>(<span style="color:${C.yellow}">"pdf"</span>);`}
          explain={<><strong style={{color:C.yellow}}>This is the MOST important line in the entire pattern!</strong> Look at the left side: <code>DocumentExporter exporter</code> — the variable type is the INTERFACE. Not PdfExporter. The client doesn't know or care what concrete type it gets. The right side calls the factory, which returns a PdfExporter, but the client sees it only as a DocumentExporter.</>}
          jvm={`<strong style="color:${C.pink}">This is where the magic happens in memory:</strong><br/><br/>📦 <strong>STACK</strong> (Main thread, main() frame):<br/>┌──────────────────────────────┐<br/>│ exporter → <span style="color:${C.yellow}">0x7f3a</span> (reference) │<br/>└──────────────────────────────┘<br/><br/>📦 <strong>HEAP</strong>:<br/>┌──────────────────────────────┐<br/>│ Address: <span style="color:${C.yellow}">0x7f3a</span>              │<br/>│ Type: <span style="color:${C.accent}">PdfExporter</span>            │<br/>│ (actual object lives here)   │<br/>└──────────────────────────────┘<br/><br/>The variable <code>exporter</code> on the Stack holds a REFERENCE (memory address) pointing to the actual PdfExporter object on the Heap. The <strong>variable type</strong> is DocumentExporter (interface) but the <strong>actual object</strong> is PdfExporter. This is <span style="color:${C.accent}">polymorphism</span> — one variable type, many possible object types.`}
          color={C.accent}
        />
        <LineExplain lineNum={2}
          code={`<span style="color:${C.accent}">String</span> result = exporter.<span style="color:${C.blue}">export</span>(<span style="color:${C.yellow}">"My Report Data"</span>);`}
          explain={<>Calls .export() on the exporter. Even though the variable type is <code>DocumentExporter</code>, JVM calls PdfExporter's export() method. Why? Because JVM looks at the ACTUAL object type at runtime (dynamic dispatch), not the variable type. This is polymorphism in action!</>}
          jvm={`<strong>Dynamic Dispatch (virtual method invocation):</strong><br/>1️⃣ JVM looks at <code>exporter</code> reference → points to <span style="color:${C.yellow}">0x7f3a</span><br/>2️⃣ Goes to that Heap address → finds object type is <span style="color:${C.accent}">PdfExporter</span><br/>3️⃣ Looks up PdfExporter's <strong>vtable</strong> (method table)<br/>4️⃣ Finds <code>export()</code> → calls PdfExporter.export()<br/>5️⃣ New Stack Frame pushed: <code>export(content="My Report Data")</code><br/>6️⃣ Returns String → stored in <code>result</code> variable on Stack`}
          color={C.blue}
        />
      </Diagram>
    </div>
  );
}

function JVMMemory() {
  const [step, setStep] = useState(0);
  const steps = [
    {
      title: "Step 0: Before main() runs",
      desc: "JVM starts. ClassLoader loads Main.class into Method Area.",
      stack: [{ label: "Empty", color: C.dim }],
      heap: [],
      method: ["Main.class", "DocumentExporter.interface"],
      arrows: [],
    },
    {
      title: "Step 1: main() is called",
      desc: "JVM pushes a Stack Frame for main() method onto the Stack.",
      stack: [{ label: "main() frame", color: C.blue, vars: ["args → String[]"] }],
      heap: [{ addr: "0x1000", type: "String[] args", color: C.dim }],
      method: ["Main.class", "DocumentExporter.interface"],
      arrows: ["args → 0x1000"],
    },
    {
      title: 'Step 2: ExporterFactory.createExporter("pdf") called',
      desc: "Static method call — NO ExporterFactory object created! JVM loads ExporterFactory.class, then PdfExporter.class. Pushes createExporter() frame.",
      stack: [
        { label: "createExporter() frame", color: C.pink, vars: ['type = "pdf"'] },
        { label: "main() frame", color: C.blue, vars: ["args → 0x1000", "exporter = (not set yet)"] },
      ],
      heap: [{ addr: "0x1000", type: "String[] args", color: C.dim }],
      method: ["Main.class", "DocumentExporter.interface", "ExporterFactory.class", "PdfExporter.class"],
      arrows: [],
    },
    {
      title: "Step 3: new PdfExporter() executes inside factory",
      desc: "JVM allocates memory on the Heap for a new PdfExporter object. Constructor runs. Reference returned.",
      stack: [
        { label: "createExporter() frame", color: C.pink, vars: ['type = "pdf"', "return → 0x2000"] },
        { label: "main() frame", color: C.blue, vars: ["args → 0x1000", "exporter = (not set yet)"] },
      ],
      heap: [
        { addr: "0x1000", type: "String[] args", color: C.dim },
        { addr: "0x2000", type: "PdfExporter ✨ NEW!", color: C.accent },
      ],
      method: ["Main.class", "DocumentExporter.interface", "ExporterFactory.class", "PdfExporter.class"],
      arrows: ["createExporter returns 0x2000"],
    },
    {
      title: "Step 4: Reference assigned to 'exporter' variable",
      desc: "createExporter() frame is POPPED off Stack. The returned reference (0x2000) is stored in 'exporter' variable. Variable TYPE is DocumentExporter, but ACTUAL object is PdfExporter.",
      stack: [
        { label: "main() frame", color: C.blue, vars: ["args → 0x1000", "exporter → 0x2000 ✨"] },
      ],
      heap: [
        { addr: "0x1000", type: "String[] args", color: C.dim },
        { addr: "0x2000", type: "PdfExporter", color: C.accent },
      ],
      method: ["Main.class", "DocumentExporter.interface", "ExporterFactory.class", "PdfExporter.class"],
      arrows: ["exporter (DocumentExporter type) ──→ 0x2000 (PdfExporter object)"],
    },
    {
      title: "Step 5: exporter.export(\"My Report Data\") called",
      desc: "JVM uses DYNAMIC DISPATCH: checks actual object type (PdfExporter) → calls PdfExporter.export(). New frame pushed. String result created on Heap.",
      stack: [
        { label: "PdfExporter.export() frame", color: C.accent, vars: ['this → 0x2000', 'content = "My Report Data"'] },
        { label: "main() frame", color: C.blue, vars: ["args → 0x1000", "exporter → 0x2000"] },
      ],
      heap: [
        { addr: "0x1000", type: "String[] args", color: C.dim },
        { addr: "0x2000", type: "PdfExporter", color: C.accent },
        { addr: "0x3000", type: '"[PDF Header] My Report Data [PDF Footer]"', color: C.yellow },
      ],
      method: ["Main.class", "DocumentExporter.interface", "ExporterFactory.class", "PdfExporter.class"],
      arrows: ["Dynamic Dispatch: Interface call → actual PdfExporter method"],
    },
  ];

  const s = steps[step];
  return (
    <div>
      <h2 style={{ color: C.accent }}>🧠 JVM Memory — Step by Step</h2>
      <p style={{ color: C.dim, fontSize: 14 }}>Watch how objects, references, and memory work as each line executes</p>

      {/* Step navigator */}
      <div style={{ display: "flex", gap: 4, margin: "16px 0", flexWrap: "wrap" }}>
        {steps.map((st, i) => (
          <button key={i} onClick={() => setStep(i)} style={{
            padding: "8px 14px", borderRadius: 8, border: step === i ? `2px solid ${C.accent}` : `1px solid ${C.border}`,
            background: step === i ? `${C.accent}15` : "transparent", color: step === i ? C.accent : C.dim,
            cursor: "pointer", fontSize: 12, fontWeight: step === i ? 700 : 400,
          }}>
            Step {i}
          </button>
        ))}
      </div>

      {/* Current step info */}
      <Box color={C.yellow} style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 700, color: C.yellow, fontSize: 16 }}>{s.title}</div>
        <div style={{ color: C.text, marginTop: 6 }}>{s.desc}</div>
      </Box>

      {/* Memory visualization */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
        {/* Stack */}
        <Diagram title="📚 Stack (Thread)">
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {s.stack.map((frame, i) => (
              <div key={i} style={{ padding: "10px 12px", borderRadius: 8, background: `${frame.color}15`, border: `1.5px solid ${frame.color}44` }}>
                <div style={{ fontWeight: 700, color: frame.color, fontSize: 13 }}>{frame.label}</div>
                {frame.vars && frame.vars.map((v, j) => (
                  <div key={j} style={{ fontSize: 11, color: C.text, fontFamily: "monospace", marginTop: 3 }}>{v}</div>
                ))}
              </div>
            ))}
            <div style={{ textAlign: "center", color: C.dim, fontSize: 11, marginTop: 4 }}>↑ grows upward</div>
          </div>
        </Diagram>

        {/* Heap */}
        <Diagram title="📦 Heap (Objects)">
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {s.heap.length === 0 ? (
              <div style={{ color: C.dim, fontSize: 12, textAlign: "center", padding: 20 }}>Empty — no objects yet</div>
            ) : s.heap.map((obj, i) => (
              <div key={i} style={{ padding: "10px 12px", borderRadius: 8, background: `${obj.color}12`, border: `1.5px solid ${obj.color}33` }}>
                <div style={{ fontFamily: "monospace", fontSize: 11, color: obj.color, fontWeight: 600 }}>{obj.addr}</div>
                <div style={{ fontSize: 12, color: C.text, marginTop: 2 }}>{obj.type}</div>
              </div>
            ))}
          </div>
        </Diagram>

        {/* Method Area */}
        <Diagram title="⚙️ Method Area">
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {s.method.map((m, i) => (
              <div key={i} style={{ padding: "6px 10px", borderRadius: 6, background: `${C.purple}10`, border: `1px solid ${C.purple}22`, fontSize: 11, fontFamily: "monospace", color: C.purple }}>
                {m}
              </div>
            ))}
          </div>
        </Diagram>
      </div>

      {/* Arrows / connections */}
      {s.arrows.length > 0 && (
        <Box color={C.pink} style={{ marginTop: 12 }}>
          <div style={{ fontWeight: 600, color: C.pink, fontSize: 12, marginBottom: 4 }}>🔗 References & Connections:</div>
          {s.arrows.map((a, i) => (
            <div key={i} style={{ fontSize: 13, fontFamily: "monospace", color: C.text }}>{a}</div>
          ))}
        </Box>
      )}

      {/* Key insight for this step */}
      {step === 2 && (
        <Box color={C.yellow} style={{ marginTop: 12 }}>
          <strong style={{ color: C.yellow }}>💡 KEY: Static method = NO object on Heap!</strong>
          <div style={{ color: C.text, fontSize: 13, marginTop: 4 }}>
            <code>ExporterFactory.createExporter("pdf")</code> — notice we never write <code>new ExporterFactory()</code>.
            The static method lives in the Method Area (class level), not in any object. This is why we use <code>static</code> for factory methods — there's no state to store, no reason to create a factory object.
          </div>
        </Box>
      )}
      {step === 4 && (
        <Box color={C.accent} style={{ marginTop: 12 }}>
          <strong style={{ color: C.accent }}>💡 KEY: Reference Type ≠ Object Type!</strong>
          <div style={{ color: C.text, fontSize: 13, marginTop: 4 }}>
            <code style={{ color: C.blue }}>DocumentExporter</code> exporter → points to → <code style={{ color: C.accent }}>PdfExporter</code> object<br/>
            The <strong>variable type</strong> (left side) = interface. The <strong>actual object</strong> (on Heap) = PdfExporter.<br/>
            This is <strong>polymorphism</strong>. Tomorrow you can make it point to WordExporter — no code change in Main!
          </div>
        </Box>
      )}
      {step === 5 && (
        <Box color={C.purple} style={{ marginTop: 12 }}>
          <strong style={{ color: C.purple }}>💡 KEY: Dynamic Dispatch (Virtual Method Invocation)</strong>
          <div style={{ color: C.text, fontSize: 13, marginTop: 4 }}>
            When JVM sees <code>exporter.export()</code>, it doesn't look at the variable type (DocumentExporter).
            It follows the reference to the <strong>actual object on the Heap</strong> → finds it's a PdfExporter → looks up PdfExporter's vtable → calls PdfExporter.export().
            This decision happens at <strong>runtime</strong>, not compile time!
          </div>
        </Box>
      )}
    </div>
  );
}

function WhyAbstract() {
  return (
    <div>
      <h2 style={{ color: C.accent }}>🤔 Interface vs Abstract Class — When & Why?</h2>

      <Diagram title="The Big Question: Why did we use interface? When to use abstract class?">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Box color={C.blue} style={{ minHeight: 200 }}>
            <div style={{ fontWeight: 700, color: C.blue, fontSize: 18, marginBottom: 8 }}>Interface</div>
            <Tag color={C.blue}>100% abstract</Tag> <Tag color={C.blue}>No state</Tag> <Tag color={C.blue}>Multiple inheritance</Tag>
            <div style={{ marginTop: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
              • <strong>Zero</strong> shared code — just method signatures<br/>
              • A class can implement <strong>multiple</strong> interfaces<br/>
              • Says: <em>"WHAT you must do"</em><br/>
              • Use when classes are <strong>unrelated</strong> but share behavior<br/>
              • Example: Dog and Robot both can <code>move()</code>
            </div>
          </Box>
          <Box color={C.purple} style={{ minHeight: 200 }}>
            <div style={{ fontWeight: 700, color: C.purple, fontSize: 18, marginBottom: 8 }}>Abstract Class</div>
            <Tag color={C.purple}>Partial code</Tag> <Tag color={C.purple}>Has state</Tag> <Tag color={C.purple}>Single inheritance</Tag>
            <div style={{ marginTop: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
              • <strong>Can share</strong> common code between children<br/>
              • A class can extend only <strong>one</strong> abstract class<br/>
              • Says: <em>"WHAT + partially HOW"</em><br/>
              • Use when classes are <strong>related</strong> and share code<br/>
              • Example: PdfExporter and WordExporter share logging
            </div>
          </Box>
        </div>
      </Diagram>

      <Diagram title="🔄 Let's REFACTOR our solution to use Abstract Class">
        <Box color={C.yellow}>
          <strong style={{ color: C.yellow }}>Scenario:</strong> What if ALL exporters need to log before exporting?
          Instead of copying the same log code in every class, we use an abstract class to share it.
        </Box>
      </Diagram>

      <Code title="REFACTORED: Using Abstract Class — BaseExporter.java" code={`<span style="color:${C.dim}">// ═══════════════════════════════════════════════════════</span>
<span style="color:${C.dim}">// ABSTRACT CLASS — shares COMMON code between all exporters</span>
<span style="color:${C.dim}">// Think of it as a "half-finished blueprint"</span>
<span style="color:${C.dim}">// ═══════════════════════════════════════════════════════</span>

<span style="color:${C.pink}">public abstract class</span> <span style="color:${C.accent}">BaseExporter</span> <span style="color:${C.pink}">implements</span> <span style="color:${C.accent}">DocumentExporter</span> {

    <span style="color:${C.dim}">// ✅ SHARED STATE — all exporters track export count</span>
    <span style="color:${C.pink}">protected int</span> exportCount = <span style="color:${C.yellow}">0</span>;

    <span style="color:${C.dim}">// ✅ SHARED METHOD — same for ALL exporters (concrete method)</span>
    <span style="color:${C.pink}">public void</span> <span style="color:${C.blue}">log</span>(<span style="color:${C.accent}">String</span> message) {
        System.out.println(<span style="color:${C.yellow}">"[LOG] "</span> + getFileExtension() + <span style="color:${C.yellow}">": "</span> + message);
    }

    <span style="color:${C.dim}">// ✅ TEMPLATE METHOD — defines the SKELETON, children fill the gap</span>
    <span style="color:${C.pink}">@Override</span>
    <span style="color:${C.pink}">public</span> <span style="color:${C.accent}">String</span> <span style="color:${C.blue}">export</span>(<span style="color:${C.accent}">String</span> content) {
        log(<span style="color:${C.yellow}">"Starting export..."</span>);            <span style="color:${C.dim}">// shared step</span>
        <span style="color:${C.accent}">String</span> result = <span style="color:${C.blue}">doExport</span>(content);     <span style="color:${C.dim}">// ← child fills this in</span>
        exportCount++;                            <span style="color:${C.dim}">// shared step</span>
        log(<span style="color:${C.yellow}">"Export #"</span> + exportCount + <span style="color:${C.yellow}">" done!"</span>); <span style="color:${C.dim}">// shared step</span>
        <span style="color:${C.pink}">return</span> result;
    }

    <span style="color:${C.dim}">// ❗ ABSTRACT METHOD — children MUST implement this</span>
    <span style="color:${C.dim}">// This is the "blank" that each child fills differently</span>
    <span style="color:${C.pink}">protected abstract</span> <span style="color:${C.accent}">String</span> <span style="color:${C.blue}">doExport</span>(<span style="color:${C.accent}">String</span> content);
    
    <span style="color:${C.dim}">// getFileExtension() is still abstract (from interface)</span>
    <span style="color:${C.dim}">// — each child must define its own extension</span>
}`} />

      <Code title="PdfExporter.java — Now extends BaseExporter" code={`<span style="color:${C.dim}">// NOW: PdfExporter extends abstract class instead of implementing interface directly</span>
<span style="color:${C.dim}">// It inherits log(), export(), and exportCount FOR FREE</span>

<span style="color:${C.pink}">public class</span> <span style="color:${C.accent}">PdfExporter</span> <span style="color:${C.pink}">extends</span> <span style="color:${C.accent}">BaseExporter</span> {

    <span style="color:${C.dim}">// Only need to implement the UNIQUE parts!</span>
    <span style="color:${C.pink}">@Override</span>
    <span style="color:${C.pink}">protected</span> <span style="color:${C.accent}">String</span> <span style="color:${C.blue}">doExport</span>(<span style="color:${C.accent}">String</span> content) {
        <span style="color:${C.pink}">return</span> <span style="color:${C.yellow}">"[PDF Header] "</span> + content + <span style="color:${C.yellow}">" [PDF Footer]"</span>;
    }

    <span style="color:${C.pink}">@Override</span>
    <span style="color:${C.pink}">public</span> <span style="color:${C.accent}">String</span> <span style="color:${C.blue}">getFileExtension</span>() {
        <span style="color:${C.pink}">return</span> <span style="color:${C.yellow}">".pdf"</span>;
    }
}

<span style="color:${C.dim}">// WordExporter and ExcelExporter follow the exact same pattern</span>
<span style="color:${C.dim}">// They extend BaseExporter and only implement doExport() and getFileExtension()</span>`} />

      <Diagram title="Visual: What each layer provides">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <Box color={C.blue} style={{ width: "85%", textAlign: "center", padding: 12 }}>
            <strong style={{ color: C.blue }}>DocumentExporter (Interface)</strong><br/>
            <span style={{ fontSize: 12, color: C.dim }}>Contract: export(), getFileExtension() — NO code</span>
          </Box>
          <div style={{ color: C.dim, fontSize: 16 }}>▼ implements</div>
          <Box color={C.purple} style={{ width: "85%", textAlign: "center", padding: 12 }}>
            <strong style={{ color: C.purple }}>BaseExporter (Abstract Class)</strong><br/>
            <span style={{ fontSize: 12, color: C.dim }}>Shared: log(), export() template, exportCount field</span><br/>
            <span style={{ fontSize: 12, color: C.pink }}>Abstract: doExport() — children MUST fill this in</span>
          </Box>
          <div style={{ color: C.dim, fontSize: 16 }}>▼ extends</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, width: "95%" }}>
            {[
              { name: "PdfExporter", color: C.pink, ext: ".pdf" },
              { name: "WordExporter", color: C.blue, ext: ".docx" },
              { name: "ExcelExporter", color: C.accent, ext: ".xlsx" },
            ].map((e, i) => (
              <Box key={i} color={e.color} style={{ textAlign: "center", padding: 10 }}>
                <strong style={{ color: e.color, fontSize: 13 }}>{e.name}</strong><br/>
                <span style={{ fontSize: 11, color: C.dim }}>Only: doExport() + "{e.ext}"</span>
              </Box>
            ))}
          </div>
        </div>
      </Diagram>

      <Diagram title="JVM Memory: Abstract Class Object">
        <Box color={C.purple}>
          <div style={{ fontWeight: 700, color: C.purple, marginBottom: 8 }}>Can you do <code>new BaseExporter()</code>? ❌ NO!</div>
          <div style={{ fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            Abstract classes <strong>cannot be instantiated</strong>. JVM will throw <code>InstantiationError</code>.
            You can only create objects of <strong>concrete</strong> (non-abstract) children.
          </div>
        </Box>

        <div style={{ marginTop: 16, padding: 16, background: `${C.code_bg}`, borderRadius: 8, fontFamily: "monospace", fontSize: 12, lineHeight: 2, color: C.text }}>
          <div style={{ color: C.accent, fontWeight: 700, marginBottom: 8 }}>When you do: new PdfExporter()</div>
          <div>
            <strong style={{ color: C.yellow }}>HEAP at address 0x2000:</strong><br/>
            ┌───────────────────────────────────────────────┐<br/>
            │ <span style={{ color: C.purple }}>Object Header</span>: class pointer → PdfExporter.class  │<br/>
            │ <span style={{ color: C.pink }}>Fields from BaseExporter:</span>                       │<br/>
            │ &nbsp;&nbsp; exportCount = 0  <span style={{ color: C.dim }}>(inherited field)</span>          │<br/>
            │ <span style={{ color: C.accent }}>Fields from PdfExporter:</span>                        │<br/>
            │ &nbsp;&nbsp; (none in this example)                       │<br/>
            │ <span style={{ color: C.blue }}>Methods available (vtable):</span>                     │<br/>
            │ &nbsp;&nbsp; log() → from BaseExporter <span style={{ color: C.dim }}>(inherited)</span>       │<br/>
            │ &nbsp;&nbsp; export() → from BaseExporter <span style={{ color: C.dim }}>(inherited)</span>    │<br/>
            │ &nbsp;&nbsp; doExport() → from <span style={{ color: C.accent }}>PdfExporter</span> <span style={{ color: C.dim }}>(overridden)</span> │<br/>
            │ &nbsp;&nbsp; getFileExtension() → from <span style={{ color: C.accent }}>PdfExporter</span>     │<br/>
            └───────────────────────────────────────────────┘
          </div>
        </div>
      </Diagram>

      <Diagram title="🎯 Decision Rule — When to Use What?">
        <div style={{ display: "grid", gap: 12 }}>
          {[
            { q: "Do all concrete classes share ZERO common code?", a: "→ Use Interface", color: C.blue },
            { q: "Do all concrete classes share some common fields or methods?", a: "→ Use Abstract Class", color: C.purple },
            { q: "Do you need a class to implement multiple contracts?", a: "→ Use Interface (Java allows multiple interfaces)", color: C.blue },
            { q: "Do you need shared constructor logic?", a: "→ Use Abstract Class (interfaces have no constructors)", color: C.purple },
            { q: "Best of both worlds?", a: "→ Interface + Abstract Class (like we did: interface at top, abstract class in middle)", color: C.accent },
          ].map((item, i) => (
            <Box key={i} color={item.color}>
              <strong style={{ color: C.yellow }}>{item.q}</strong>
              <div style={{ color: item.color, fontWeight: 600, marginTop: 4 }}>{item.a}</div>
            </Box>
          ))}
        </div>
      </Diagram>
    </div>
  );
}

function StaticDeep() {
  return (
    <div>
      <h2 style={{ color: C.accent }}>⚡ Static Method — Deep Dive in JVM</h2>

      <Diagram title="Why is the factory method static?">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Box color={C.pink}>
            <div style={{ fontWeight: 700, color: C.pink, marginBottom: 8 }}>Without static (instance method)</div>
            <code style={{ fontFamily: "monospace", fontSize: 12, color: C.text }}>
              {`// You'd have to write:`}<br/>
              ExporterFactory factory = <span style={{ color: C.pink }}>new</span> ExporterFactory();<br/>
              DocumentExporter exp = factory.createExporter("pdf");<br/><br/>
              <span style={{ color: C.dim }}>// ❌ Creating a factory OBJECT just to call one method?</span><br/>
              <span style={{ color: C.dim }}>// ❌ Wasteful! Factory has NO state to store</span><br/>
              <span style={{ color: C.dim }}>// ❌ Extra object on the Heap for no reason</span>
            </code>
          </Box>
          <Box color={C.accent}>
            <div style={{ fontWeight: 700, color: C.accent, marginBottom: 8 }}>With static ✅</div>
            <code style={{ fontFamily: "monospace", fontSize: 12, color: C.text }}>
              {`// Just call it directly on the class:`}<br/>
              DocumentExporter exp = ExporterFactory.createExporter("pdf");<br/><br/>
              <span style={{ color: C.accent }}>// ✅ No factory object needed</span><br/>
              <span style={{ color: C.accent }}>// ✅ Clean and simple</span><br/>
              <span style={{ color: C.accent }}>// ✅ No Heap allocation for factory</span>
            </code>
          </Box>
        </div>
      </Diagram>

      <Diagram title="JVM: Static vs Instance — What Lives Where?">
        <div style={{ fontFamily: "monospace", fontSize: 12, lineHeight: 2.2, color: C.text, padding: "10px 16px", background: C.code_bg, borderRadius: 8 }}>
          <strong style={{ color: C.yellow, fontSize: 14 }}>JVM MEMORY LAYOUT:</strong><br/><br/>
          
          <strong style={{ color: C.purple }}>┌─── METHOD AREA (Metaspace) ───────────────────┐</strong><br/>
          │&nbsp; ExporterFactory.class                         │<br/>
          │&nbsp;&nbsp;&nbsp; <span style={{ color: C.accent }}>├─ static createExporter()</span> <span style={{ color: C.dim }}>← lives HERE</span>      │<br/>
          │&nbsp;&nbsp;&nbsp; <span style={{ color: C.dim }}>├─ Class metadata</span>                          │<br/>
          │&nbsp;&nbsp;&nbsp; <span style={{ color: C.dim }}>└─ Constant pool</span>                           │<br/>
          <strong style={{ color: C.purple }}>└────────────────────────────────────────────────┘</strong><br/><br/>
          
          <strong style={{ color: C.accent }}>┌─── HEAP ──────────────────────────────────────┐</strong><br/>
          │&nbsp; <span style={{ color: C.dim }}>No ExporterFactory object here!</span>               │<br/>
          │&nbsp; <span style={{ color: C.dim }}>Static method doesn't need an object.</span>          │<br/>
          │&nbsp;                                               │<br/>
          │&nbsp; 0x2000: <span style={{ color: C.accent }}>PdfExporter object</span> <span style={{ color: C.dim }}>← created BY the</span>    │<br/>
          │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style={{ color: C.dim }}>static method, lives here</span>               │<br/>
          <strong style={{ color: C.accent }}>└────────────────────────────────────────────────┘</strong><br/><br/>
          
          <strong style={{ color: C.blue }}>┌─── STACK (main thread) ───────────────────────┐</strong><br/>
          │&nbsp; main() frame:                                 │<br/>
          │&nbsp;&nbsp;&nbsp; exporter → <span style={{ color: C.yellow }}>0x2000</span> <span style={{ color: C.dim }}>(reference to Heap)</span>        │<br/>
          <strong style={{ color: C.blue }}>└────────────────────────────────────────────────┘</strong>
        </div>
      </Diagram>

      <Diagram title="Static Method — 5 Key Rules to Remember">
        <div style={{ display: "grid", gap: 10 }}>
          {[
            { rule: "static methods belong to the CLASS, not to objects", detail: "Called via ClassName.method() — no 'new' needed", icon: "1️⃣" },
            { rule: "static methods have NO 'this' reference", detail: "Because there's no object — 'this' means 'current object' which doesn't exist", icon: "2️⃣" },
            { rule: "static methods CAN'T access instance variables/methods directly", detail: "They don't have an object, so there's no object's data to access", icon: "3️⃣" },
            { rule: "static methods are loaded when class is loaded by ClassLoader", detail: "Available immediately — no need to construct anything first", icon: "4️⃣" },
            { rule: "Only ONE copy of static method in memory", detail: "Shared across all calls — lives in Method Area, not duplicated on Heap", icon: "5️⃣" },
          ].map((r, i) => (
            <Box key={i} color={C.accent}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: 20 }}>{r.icon}</span>
                <div>
                  <strong style={{ color: C.accent }}>{r.rule}</strong>
                  <div style={{ color: C.dim, fontSize: 13, marginTop: 2 }}>{r.detail}</div>
                </div>
              </div>
            </Box>
          ))}
        </div>
      </Diagram>

      <Diagram title='When to use "static" for factory method vs not?'>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Box color={C.accent}>
            <strong style={{ color: C.accent }}>Use static when:</strong>
            <div style={{ fontSize: 13, marginTop: 6, lineHeight: 1.7 }}>
              • Factory has NO state (fields) to store<br/>
              • Simple creation logic (switch/map)<br/>
              • No configuration needed<br/>
              • 90% of simple factories = static
            </div>
          </Box>
          <Box color={C.purple}>
            <strong style={{ color: C.purple }}>Use non-static when:</strong>
            <div style={{ fontSize: 13, marginTop: 6, lineHeight: 1.7 }}>
              • Factory has configuration state<br/>
              • Factory needs dependency injection<br/>
              • Factory itself is from an Abstract Factory<br/>
              • You need multiple factory instances
            </div>
          </Box>
        </div>
      </Diagram>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────
const tabs = [
  { icon: "📋", label: "Requirement", comp: Requirement },
  { icon: "✅", label: "Solution", comp: Solution },
  { icon: "🔬", label: "Line-by-Line", comp: LineByLine },
  { icon: "🧠", label: "JVM Memory", comp: JVMMemory },
  { icon: "🤔", label: "Why Abstract?", comp: WhyAbstract },
  { icon: "⚡", label: "Static Deep Dive", comp: StaticDeep },
];

export default function FactoryPractice() {
  const [tab, setTab] = useState(0);
  const Section = tabs[tab].comp;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'DM Sans', -apple-system, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, #0d0b20, #15133a, #1a1040)`, borderBottom: `1px solid ${C.border}`, padding: "28px 36px" }}>
        <div style={{ fontSize: 11, color: C.pink, textTransform: "uppercase", letterSpacing: 3, fontWeight: 600 }}>Factory Pattern — Practice Lab</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, margin: "6px 0 2px", background: `linear-gradient(135deg, ${C.accent}, ${C.blue}, ${C.pink})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Document Exporter Exercise
        </h1>
        <p style={{ color: C.dim, fontSize: 14, margin: 0 }}>Complete requirement → solution → line-by-line → JVM internals → abstract class deep dive</p>
      </div>

      {/* Tabs */}
      <div style={{ padding: "10px 36px", background: "#0a0a18", borderBottom: `1px solid ${C.border}`, display: "flex", gap: 4, overflowX: "auto" }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i)} style={{
            padding: "8px 16px", borderRadius: 8,
            border: tab === i ? `2px solid ${C.accent}` : `1px solid transparent`,
            background: tab === i ? `${C.accent}12` : "transparent",
            color: tab === i ? C.accent : C.dim,
            cursor: "pointer", fontWeight: tab === i ? 700 : 400, fontSize: 13,
            whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 6,
          }}>
            <span>{t.icon}</span> {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "28px 36px", maxWidth: 980 }}>
        <Section />

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 36, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
          <button onClick={() => setTab(Math.max(0, tab - 1))} disabled={tab === 0}
            style={{ padding: "10px 22px", borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent", color: tab === 0 ? "#333" : C.blue, cursor: tab === 0 ? "default" : "pointer", fontSize: 14 }}>
            ← Previous
          </button>
          <span style={{ color: C.dim, fontSize: 13, alignSelf: "center" }}>{tab + 1} / {tabs.length}</span>
          <button onClick={() => setTab(Math.min(tabs.length - 1, tab + 1))} disabled={tab === tabs.length - 1}
            style={{ padding: "10px 22px", borderRadius: 8, border: `1px solid ${C.accent}33`, background: tab === tabs.length - 1 ? "transparent" : `${C.accent}12`, color: tab === tabs.length - 1 ? "#333" : C.accent, cursor: tab === tabs.length - 1 ? "default" : "pointer", fontSize: 14, fontWeight: 600 }}>
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}