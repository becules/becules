```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Becules - Learn Smarter. Achieve Greater.</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        teal: {
                            50: '#f0fdfa',
                            100: '#ccfbf1',
                            500: '#14b8a6',
                            600: '#0d9488',
                            700: '#0f766e',
                            800: '#115e59',
                            900: '#134e4a',
                        }
                    },
                    fontFamily: {
                        sans: ['Plus Jakarta Sans', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <style>
        body {
            background-color: #f7faf9;
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 5px;
            height: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
        }
    </style>
</head>
<body class="text-slate-800 font-sans min-h-screen flex flex-col antialiased">

    <!-- Navigation Bar -->
    <header class="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
            <div class="flex items-center justify-between h-16">
                <!-- Logo -->
                <div class="flex items-center space-x-2 cursor-pointer" onclick="navigateTo('home')">
                    <span class="text-2xl font-black tracking-tight text-slate-900">
                        Becules<span class="text-teal-600">.</span>
                    </span>
                </div>

                <!-- Navigation Links -->
                <nav class="hidden md:flex space-x-8">
                    <button id="nav-home" onclick="navigateTo('home')" class="text-sm font-semibold text-slate-600 hover:text-teal-600 transition">Home</button>
                    <button id="nav-resources" onclick="navigateTo('resources')" class="text-sm font-semibold text-slate-600 hover:text-teal-600 transition">Resources</button>
                    <button id="nav-about" onclick="navigateTo('about')" class="text-sm font-semibold text-slate-600 hover:text-teal-600 transition">About Us</button>
                    <button id="nav-contribute" onclick="navigateTo('contribute')" class="text-sm font-semibold text-slate-600 hover:text-teal-600 transition">Contribute</button>
                </nav>

                <!-- Mobile Menu Icon -->
                <div class="md:hidden">
                    <button onclick="toggleMobileMenu()" class="p-2 text-slate-600 hover:text-slate-900">
                        <i class="fa-solid fa-bars text-xl"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2">
            <button onclick="navigateTo('home'); toggleMobileMenu()" class="block w-full text-left py-2 text-sm font-semibold text-slate-700">Home</button>
            <button onclick="navigateTo('resources'); toggleMobileMenu()" class="block w-full text-left py-2 text-sm font-semibold text-slate-700">Resources</button>
            <button onclick="navigateTo('about'); toggleMobileMenu()" class="block w-full text-left py-2 text-sm font-semibold text-slate-700">About Us</button>
            <button onclick="navigateTo('contribute'); toggleMobileMenu()" class="block w-full text-left py-2 text-sm font-semibold text-slate-700">Contribute</button>
        </div>
    </header>

    <!-- Main Dynamic Content Container -->
    <main id="main-content" class="flex-grow">
        <!-- Content inserted dynamically -->
    </main>

    <!-- Practice Question Modal -->
    <div id="practice-modal" class="fixed inset-0 z-50 hidden bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-2xl overflow-hidden transform transition-all max-h-[90vh] flex flex-col">
            <!-- Modal Header -->
            <div class="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between shrink-0">
                <div>
                    <span id="modal-subject-tag" class="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/60">Physics</span>
                    <h3 id="modal-chapter-title" class="text-lg font-bold text-slate-900 mt-2">Chapter Title</h3>
                </div>
                <button onclick="closeModal()" class="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-200/50 transition">
                    <i class="fa-solid fa-xmark text-lg"></i>
                </button>
            </div>

            <!-- Modal Content -->
            <div class="p-6 overflow-y-auto custom-scrollbar flex-grow">
                <div id="question-box" class="space-y-4">
                    <!-- Dynamic Question & Options -->
                </div>

                <!-- Explanation Box -->
                <div id="explanation-box" class="hidden mt-6 p-4 rounded-xl bg-teal-50/70 border border-teal-100">
                    <div class="flex items-start space-x-3">
                        <i class="fa-solid fa-circle-check text-teal-600 text-lg mt-0.5"></i>
                        <div>
                            <h4 class="text-xs font-bold uppercase tracking-wider text-teal-900">Solution & Concept</h4>
                            <p id="explanation-text" class="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed"></p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal Footer -->
            <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end space-x-3 shrink-0">
                <button onclick="closeModal()" class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-200/60 transition">
                    Cancel
                </button>
                <button id="submit-btn" onclick="submitAnswer()" class="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-teal-700 hover:bg-teal-800 transition shadow-sm">
                    Submit Answer
                </button>
            </div>
        </div>
    </div>

    <!-- Toast Notification -->
    <div id="toast" class="fixed bottom-6 right-6 z-50 hidden bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg text-xs font-semibold flex items-center space-x-2 transition-all">
        <span id="toast-message">Notification</span>
    </div>

    <!-- Footer -->
    <footer class="border-t border-slate-200/80 bg-white py-8 mt-12">
        <div class="max-w-6xl mx-auto px-4 text-center">
            <p class="text-xs font-medium text-slate-400">© 2026 Becules. Learn Smarter. Achieve Greater.</p>
        </div>
    </footer>

    <!-- App JavaScript -->
    <script>
        // Curriculum Database (1 Question Per Topic across Physics, Chemistry, Math for Class 11 & 12)
        const curriculum = {
            physics: {
                11: [
                    { title: "Physical World & Units and Measurement", question: "What is the dimensional formula for Gravitational Constant (G)?", options: ["[M⁻¹ L³ T⁻²]", "[M¹ L² T⁻²]", "[M⁻² L³ T⁻¹]", "[M¹ L³ T⁻²]"], correct: 0, exp: "From F = G(m1*m2)/r², G = [M L T⁻²][L²] / [M²] = [M⁻¹ L³ T⁻²]." },
                    { title: "Motion In A Straight Line", question: "A body dropped from height H takes time T to hit the ground. Time taken to reach H/2 is:", options: ["T / √2", "T / 2", "T / 4", "T * √2"], correct: 0, exp: "H = (1/2)gT² and H/2 = (1/2)gt². Dividing both yields t = T / √2." },
                    { title: "Motion In A Plane", question: "The range of a projectile fired at an angle θ with velocity u is maximum at:", options: ["30°", "45°", "60°", "90°"], correct: 1, exp: "Horizontal range R = (u² sin 2θ) / g. Range is maximum when sin(2θ) = 1 => 2θ = 90° => θ = 45°." },
                    { title: "Laws of Motion", question: "A 2kg block rests on a rough floor (µs = 0.4). If a 5N force is applied horizontally, static friction force is:", options: ["7.84 N", "5 N", "0 N", "2 N"], correct: 1, exp: "Max static friction f_max = µs*m*g = 7.84 N. Since applied force (5 N) < f_max, static friction equals 5 N." },
                    { title: "Work, Energy and Power", question: "Work done by a force F = (3i + 4j) N displacing a body by s = (2i + 5j) m is:", options: ["26 J", "14 J", "20 J", "6 J"], correct: 0, exp: "Work W = F · s = (3*2) + (4*5) = 6 + 20 = 26 Joules." },
                    { title: "System of Particles and Rotational Motion", question: "Moment of inertia of a solid sphere of mass M and radius R about its diameter is:", options: ["(2/5) M R²", "(1/2) M R²", "(2/3) M R²", "M R²"], correct: 0, exp: "Standard result for a solid sphere about its diameter axis is I = (2/5) MR²." },
                    { title: "Gravitation", question: "Acceleration due to gravity at the center of the Earth is:", options: ["9.8 m/s²", "4.9 m/s²", "Zero", "Infinite"], correct: 2, exp: "At the Earth's center, depth d = R, so g' = g(1 - d/R) = g(1 - 1) = 0." },
                    { title: "Mechanical Properties of Solids", question: "The ratio of shear stress to shear strain is known as:", options: ["Young's Modulus", "Bulk Modulus", "Shear Modulus (Rigidity)", "Poisson's Ratio"], correct: 2, exp: "Shear Modulus (or Modulus of Rigidity) is defined as the ratio of shear stress to shear strain." },
                    { title: "Mechanical Properties of Fluids", question: "Bernoulli's principle is based on the conservation of:", options: ["Mass", "Momentum", "Energy", "Angular Momentum"], correct: 2, exp: "Bernoulli's equation represents energy conservation per unit volume for ideal fluid flow." },
                    { title: "Thermal Properties of Matter", question: "Heat required to raise the temperature of 1 kg of a substance by 1 K is:", options: ["Latent heat", "Specific heat capacity", "Thermal conductivity", "Molar heat"], correct: 1, exp: "Specific heat capacity is the heat energy required to raise unit mass by 1 Kelvin." },
                    { title: "Thermodynamics & Kinetic Theory", question: "In an isothermal process, the change in internal energy of an ideal gas is:", options: ["Positive", "Negative", "Zero", "Dependent on volume"], correct: 2, exp: "Internal energy of an ideal gas depends solely on temperature. Since ΔT = 0, ΔU = 0." }
                ],
                12: [
                    { title: "Electric Charges and Fields", question: "Torque on a dipole of moment p in a uniform field E is maximum when angle between p and E is:", options: ["0°", "45°", "90°", "180°"], correct: 2, exp: "Torque τ = pE sin(θ), which reaches its maximum value when θ = 90°." },
                    { title: "Electrostatic Potential & Capacitance", question: "If separation between plates of an isolated charged capacitor is doubled, its stored energy:", options: ["Doubles", "Halves", "Remains same", "Quadruples"], correct: 0, exp: "Capacitance C = ε0 A / d. Doubling d halves C. Since charge Q is fixed, U = Q² / (2C) doubles." },
                    { title: "Current Electricity", question: "Two resistors of 3 Ω and 6 Ω are connected in parallel to a 6V battery. Total current drawn is:", options: ["1 A", "2 A", "3 A", "9 A"], correct: 2, exp: "Equivalent resistance R = (3*6)/(3+6) = 2 Ω. Total current I = V/R = 6/2 = 3 A." },
                    { title: "Moving Charges and Magnetism", question: "Force experienced by a charge q moving with velocity v parallel to magnetic field B is:", options: ["qvB", "Zero", "qvB / 2", "qB / v"], correct: 1, exp: "F = q(v × B) = qvB sin(θ). For parallel motion, θ = 0°, so F = 0." },
                    { title: "Magnetism and Matter", question: "Susceptibility of a diamagnetic substance is:", options: ["Small and positive", "Large and positive", "Small and negative", "Zero"], correct: 2, exp: "Diamagnetic materials have small, negative magnetic susceptibility (χ < 0)." },
                    { title: "Electromagnetic Induction", question: "Direction of induced current is determined using:", options: ["Ampere's Law", "Lenz's Law", "Gauss's Law", "Biot-Savart Law"], correct: 1, exp: "Lenz's law states that induced current opposes the change in magnetic flux that produces it." },
                    { title: "Alternating Current", question: "In a purely inductive AC circuit, current lags voltage by an angle of:", options: ["0°", "45°", "90°", "180°"], correct: 2, exp: "In pure inductance, the AC voltage leads current by π/2 radians (90°)." },
                    { title: "Electromagnetic Waves", question: "Which EM wave has the shortest wavelength?", options: ["Radio waves", "Microwaves", "X-rays", "Gamma rays"], correct: 3, exp: "Gamma rays have the highest frequency and shortest wavelength in the EM spectrum." },
                    { title: "Ray Optics and Optical Instruments", question: "Power of a convex lens of focal length 20 cm is:", options: ["+2 D", "+5 D", "-5 D", "+0.05 D"], correct: 1, exp: "Power P = 1 / f (in meters) = 1 / 0.2 m = +5 Diopters." },
                    { title: "Wave Optics", question: "When light travels from air into glass, which property remains unchanged?", options: ["Wavelength", "Velocity", "Frequency", "Amplitude"], correct: 2, exp: "Frequency is determined by the light source and does not change when entering a new medium." },
                    { title: "Dual Nature of Radiation and Matter", question: "De Broglie wavelength associated with a particle of momentum p is:", options: ["λ = h / p", "λ = p / h", "λ = h * p", "λ = h / p²"], correct: 0, exp: "According to de Broglie hypothesis, matter wavelength λ = h / p." }
                ]
            },
            chemistry: {
                11: [
                    { title: "Some Basic Concepts of Chemistry", question: "Number of moles of oxygen atoms present in 1 mole of CaCO3 is:", options: ["1 mole", "2 moles", "3 moles", "6 moles"], correct: 2, exp: "Each formula unit of CaCO3 contains 3 oxygen atoms, so 1 mole of CaCO3 has 3 moles of O atoms." },
                    { title: "Structure of Atom", question: "Maximum number of electrons in a subshell with azimuthal quantum number l = 2 is:", options: ["2", "6", "10", "14"], correct: 2, exp: "Subshell l = 2 is d-subshell. Capacity = 2(2l + 1) = 2(2*2 + 1) = 10 electrons." },
                    { title: "Classification of Elements & Periodicity", question: "Which of the following element has the highest electronegativity?", options: ["Fluorine", "Chlorine", "Oxygen", "Nitrogen"], correct: 0, exp: "Fluorine is the most electronegative element in the periodic table (4.0 on Pauling scale)." },
                    { title: "Chemical Bonding & Molecular Structure", question: "Which molecule has a linear shape based on VSEPR theory?", options: ["H2O", "SO2", "CO2", "O3"], correct: 2, exp: "CO2 has sp hybridization with 2 bond pairs and zero lone pairs on Carbon, forming a linear 180° geometry." },
                    { title: "Chemical Thermodynamics", question: "For a spontaneous process at all temperatures, the required condition is:", options: ["ΔH < 0 and ΔS > 0", "ΔH > 0 and ΔS < 0", "ΔH > 0 and ΔS > 0", "ΔH < 0 and ΔS < 0"], correct: 0, exp: "ΔG = ΔH - TΔS. When ΔH is negative and ΔS is positive, ΔG is always negative (spontaneous)." },
                    { title: "Equilibrium", question: "pH of a 0.001 M HCl aqueous solution is:", options: ["1", "2", "3", "4"], correct: 2, exp: "HCl is strong acid. [H+] = 10⁻³ M. pH = -log[H+] = -log(10⁻³) = 3." },
                    { title: "Redox Reactions", question: "Oxidation state of Chromium in K2Cr2O7 is:", options: ["+3", "+4", "+6", "+7"], correct: 2, exp: "2(+1) + 2(Cr) + 7(-2) = 0 => 2 + 2Cr - 14 = 0 => 2Cr = 12 => Cr = +6." },
                    { title: "Organic Chemistry - Basic Principles & Techniques", question: "Hybridization of carbon atoms in benzene ring is:", options: ["sp", "sp²", "sp³", "dsp²"], correct: 1, exp: "All 6 carbon atoms in the benzene ring are sp² hybridized." },
                    { title: "Hydrocarbons", question: "Which reagent is used to distinguish between alkane and alkene?", options: ["Bromine water", "Litmus solution", "Tollen's reagent", "Fehling's solution"], correct: 0, exp: "Alkenes decolorize orange-red Bromine water due to addition reaction across double bond." },
                    { title: "Environmental Chemistry", question: "Gas primarily responsible for global warming is:", options: ["SO2", "CO2", "NO2", "O3"], correct: 1, exp: "Carbon dioxide (CO2) is the major greenhouse gas contributing to global warming." }
                ],
                12: [
                    { title: "Solutions", question: "Colligative property used to determine molar mass of polymers is:", options: ["Vapor pressure lowering", "Osmotic pressure", "Boiling point elevation", "Freezing point depression"], correct: 1, exp: "Osmotic pressure gives measurable readings at room temperature for large biomolecules." },
                    { title: "Electrochemistry", question: "Unit of molar conductivity (Λm) is:", options: ["S cm² mol⁻¹", "S cm⁻¹", "S cm mol⁻¹", "Ω cm mol⁻¹"], correct: 0, exp: "Molar conductivity Λm is expressed in Siemens centimeter square per mole (S cm² mol⁻¹)." },
                    { title: "Chemical Kinetics", question: "For a first order reaction, unit of rate constant k is:", options: ["mol L⁻¹ s⁻¹", "s⁻¹", "L mol⁻¹ s⁻¹", "L² mol⁻² s⁻¹"], correct: 1, exp: "Rate = k[A]¹. Therefore k has dimensions of time⁻¹ (s⁻¹)." },
                    { title: "The d- and f-Block Elements", question: "Which ion is diamagnetic in nature?", options: ["Fe²⁺", "Cu²⁺", "Zn²⁺", "Ni²⁺"], correct: 2, exp: "Zn²⁺ has electronic configuration [Ar] 3d¹⁰ with all electrons paired (diamagnetic)." },
                    { title: "Coordination Compounds", question: "IUPAC name of [Ni(CO)4] is:", options: ["Tetracarbonylnickel(0)", "Tetracarbonylnickel(II)", "Nickel tetracarbonyl(I)", "Tetracarbonylnickellate"], correct: 0, exp: "Ligand CO is neutral (charge 0), oxidation state of Ni is 0. Name: Tetracarbonylnickel(0)." },
                    { title: "Haloalkanes and Haloarenes", question: "SN2 mechanism proceeds with complete:", options: ["Retention of configuration", "Inversion of configuration", "Racemization", "No change"], correct: 1, exp: "SN2 reactions involve backside attack leading to Walden inversion (inversion of configuration)." },
                    { title: "Alcohols, Phenols and Ethers", question: "Phenol turns red litmus paper to:", options: ["Blue", "Red (No change)", "Yellow", "Green"], correct: 1, exp: "Phenol is weakly acidic in nature due to resonance stabilization of phenoxide ion." },
                    { title: "Aldehydes, Ketones and Carboxylic Acids", question: "Which test distinguishes aldehydes from ketones?", options: ["Tollen's Test", "Biuret Test", "Ninhydrin Test", "Xanthoproteic Test"], correct: 0, exp: "Aldehydes reduce Tollen's reagent to form a silver mirror; ketones do not." },
                    { title: "Amines", question: "Hinsberg reagent used to distinguish 1°, 2°, and 3° amines is:", options: ["Benzene sulfonyl chloride", "Acetyl chloride", "Benzoyl chloride", "Phosgene"], correct: 0, exp: "Benzene sulfonyl chloride (C6H5SO2Cl) is known as Hinsberg's reagent." },
                    { title: "Biomolecules", question: "Which base is present in RNA but absent in DNA?", options: ["Adenine", "Guanine", "Cytosine", "Uracil"], correct: 3, exp: "RNA contains Uracil in place of Thymine found in DNA." }
                ]
            },
            mathematics: {
                11: [
                    { title: "Sets and Functions", question: "If set A has 3 elements, number of elements in power set P(A) is:", options: ["3", "6", "8", "9"], correct: 2, exp: "Number of subsets of a set with n elements is 2ⁿ. Here 2³ = 8." },
                    { title: "Trigonometric Functions", question: "Value of sin(15°) is equal to:", options: ["(√6 - √2) / 4", "(√6 + √2) / 4", "(√3 - 1) / 2", "(√3 + 1) / 2"], correct: 0, exp: "sin(15°) = sin(45° - 30°) = sin45°cos30° - cos45°sin30° = (√6 - √2)/4." },
                    { title: "Complex Numbers & Quadratic Equations", question: "Value of i¹⁹⁹⁹ is equal to:", options: ["1", "-1", "i", "-i"], correct: 3, exp: "1999 = 4 * 499 + 3. Thus i¹⁹⁹⁹ = (i⁴)⁴⁹⁹ * i³ = 1 * (-i) = -i." },
                    { title: "Linear Inequalities", question: "Solution set of inequality 2x - 4 < 0 for real x is:", options: ["(-∞, 2)", "(2, ∞)", "[-∞, 2]", "(0, 2)"], correct: 0, exp: "2x < 4 => x < 2. Expressed as interval (-∞, 2)." },
                    { title: "Permutations and Combinations", question: "Number of ways to arrange letters of the word 'MATH' is:", options: ["12", "16", "24", "4"], correct: 2, exp: "4 distinct letters can be arranged in 4! = 4 × 3 × 2 × 1 = 24 ways." },
                    { title: "Binomial Theorem", question: "Total number of terms in expansion of (x + y)¹⁰ is:", options: ["10", "11", "9", "20"], correct: 1, exp: "Binomial expansion (a + b)ⁿ contains (n + 1) terms. Here 10 + 1 = 11 terms." },
                    { title: "Sequences and Series", question: "Sum of first n natural numbers is given by:", options: ["n(n+1)/2", "n(n-1)/2", "n²", "n(n+1)(2n+1)/6"], correct: 0, exp: "Standard arithmetic progression sum formula yields S = n(n+1)/2." },
                    { title: "Straight Lines", question: "Slope of line perpendicular to line with slope m = 2 is:", options: ["2", "-2", "1/2", "-1/2"], correct: 3, exp: "Perpendicular lines satisfy m1 * m2 = -1 => 2 * m2 = -1 => m2 = -1/2." },
                    { title: "Conic Sections", question: "Eccentricity of a circle is always equal to:", options: ["0", "1", "< 1", "> 1"], correct: 0, exp: "For a circle, foci coincide at the center, giving eccentricity e = 0." },
                    { title: "Introduction to 3D Geometry", question: "Distance of point (3, 4, 5) from the origin is:", options: ["5", "5√2", "50", "12"], correct: 1, exp: "Distance = √(3² + 4² + 5²) = √(9 + 16 + 25) = √50 = 5√2." },
                    { title: "Limits and Derivatives", question: "Derivative of sin(x) with respect to x is:", options: ["cos(x)", "-cos(x)", "tan(x)", "-sin(x)"], correct: 0, exp: "Standard calculus derivative: d/dx[sin(x)] = cos(x)." },
                    { title: "Statistics & Probability", question: "Probability of getting a sum of 12 when rolling two fair dice is:", options: ["1/36", "1/12", "1/6", "2/36"], correct: 0, exp: "Only 1 outcome (6,6) gives sum 12 out of 36 total possibilities => 1/36." }
                ],
                12: [
                    { title: "Relations and Functions", question: "If f(x) = 2x, then function f: R -> R is:", options: ["One-one & Onto", "Many-one & Into", "One-one but Into", "Onto but Many-one"], correct: 0, exp: "f(x) is strictly increasing (bijective), hence both One-one (injective) and Onto (surjective)." },
                    { title: "Inverse Trigonometric Functions", question: "Principal value of sin⁻¹(1/2) is:", options: ["π/6", "π/3", "π/4", "π/2"], correct: 0, exp: "sin(π/6) = 1/2, and π/6 lies in the principal range [-π/2, π/2]." },
                    { title: "Matrices", question: "If A is a square matrix, then A + Aᵀ is always:", options: ["Symmetric", "Skew-symmetric", "Diagonal", "Identity"], correct: 0, exp: "(A + Aᵀ)ᵀ = Aᵀ + (Aᵀ)ᵀ = Aᵀ + A = A + Aᵀ, which satisfies symmetric definition." },
                    { title: "Determinants", question: "If A is order 3x3 matrix and |A| = 5, then |adj(A)| is:", options: ["5", "15", "25", "125"], correct: 2, exp: "|adj(A)| = |A|^(n-1) = 5^(3-1) = 5² = 25." },
                    { title: "Continuity and Differentiability", question: "Derivative of e^(2x) with respect to x is:", options: ["e^(2x)", "2 e^(2x)", "0.5 e^(2x)", "2x e^(2x)"], correct: 1, exp: "By chain rule: d/dx[e^(2x)] = e^(2x) * d/dx[2x] = 2 e^(2x)." },
                    { title: "Application of Derivatives", question: "Slope of tangent to curve y = x³ at x = 2 is:", options: ["6", "8", "12", "4"], correct: 2, exp: "dy/dx = 3x². At x = 2, dy/dx = 3(2)² = 12." },
                    { title: "Integrals", question: "Integral of 1/x dx is:", options: ["ln|x| + C", "-1/x² + C", "x + C", "e^x + C"], correct: 0, exp: "Standard indefinite integral ∫ (1/x) dx = ln|x| + C." },
                    { title: "Application of Integrals", question: "Area enclosed by circle x² + y² = a² is:", options: ["2πa", "πa²", "4πa²", "πa²/2"], correct: 1, exp: "Standard area formula for circle of radius a is A = πa²." },
                    { title: "Differential Equations", question: "Order of differential equation (d²y/dx²)³ + (dy/dx)² = 0 is:", options: ["1", "2", "3", "5"], correct: 1, exp: "Order is the highest derivative present, which is d²y/dx² (Order 2)." },
                    { title: "Vector Algebra", question: "Dot product of two perpendicular vectors a and b is:", options: ["0", "1", "|a||b|", "-1"], correct: 0, exp: "a · b = |a||b| cos(90°) = 0." },
                    { title: "Three Dimensional Geometry", question: "Direction cosines of z-axis are:", options: ["(1,0,0)", "(0,1,0)", "(0,0,1)", "(1,1,1)"], correct: 2, exp: "Z-axis makes angles 90°, 90°, 0° with x, y, z axes respectively => (0, 0, 1)." },
                    { title: "Linear Programming", question: "Feasible region in linear programming problem is always:", options: ["Convex polygon", "Concave polygon", "Circle", "Unbounded line"], correct: 0, exp: "The set of linear inequality constraints forms a convex set/polygon." }
                ]
            }
        };

        // Application State
        const state = {
            currentPage: 'home', // Initial default page set to HOME
            selectedClass: 11, // 11 or 12
            selectedSubject: 'physics', // physics, chemistry, mathematics
            completedTopics: {}, // Stores topic keys e.g. physics_11_0: true
            currentModal: null,
            selectedOption: null
        };

        // Navigation Function
        function navigateTo(page) {
            state.currentPage = page;
            updateNavUI();
            renderMain();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Update active class on top navigation bar items
        function updateNavUI() {
            const navs = ['home', 'resources', 'about', 'contribute'];
            navs.forEach(n => {
                const btn = document.getElementById(`nav-${n}`);
                if (!btn) return;
                if (n === state.currentPage) {
                    btn.className = "text-sm font-semibold text-teal-600 border-b-2 border-teal-600 pb-1";
                } else {
                    btn.className = "text-sm font-semibold text-slate-600 hover:text-teal-600 transition";
                }
            });
        }

        // Subject Percentage Calculator
        function calculateSubjectCompletion(subj) {
            let totalTopics = 0;
            let completed = 0;

            [11, 12].forEach(c => {
                const list = curriculum[subj][c] || [];
                list.forEach((_, idx) => {
                    totalTopics++;
                    if (state.completedTopics[`${subj}_${c}_${idx}`]) {
                        completed++;
                    }
                });
            });

            if (totalTopics === 0) return 0;
            return Math.round((completed / totalTopics) * 100);
        }

        // Render Main Container
        function renderMain() {
            const container = document.getElementById('main-content');
            if (state.currentPage === 'home') {
                container.innerHTML = renderHome();
            } else if (state.currentPage === 'resources') {
                container.innerHTML = renderResources();
            } else if (state.currentPage === 'about') {
                container.innerHTML = renderAbout();
            } else if (state.currentPage === 'contribute') {
                container.innerHTML = renderContribute();
            }
        }

        // -----------------------
        // HOME PAGE
        // -----------------------
        function renderHome() {
            return `
                <div class="max-w-4xl mx-auto px-4 py-12 sm:py-16">
                    <span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200/60 mb-4 uppercase tracking-wider">ISC CLASS 11 & 12</span>
                    <h1 class="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        Make Every Study Session Count.
                    </h1>
                    <p class="text-slate-500 mt-4 text-base sm:text-lg max-w-2xl leading-relaxed">
                        Topic-wise practice questions and interactive test modules built to help you prepare smarter and ace your exams.
                    </p>

                    <div class="mt-8 flex flex-wrap gap-4">
                        <button onclick="navigateTo('resources')" class="px-6 py-3 rounded-xl font-bold text-white bg-teal-700 hover:bg-teal-800 transition flex items-center space-x-2 shadow-sm">
                            <span>Explore Resources</span>
                            <i class="fa-solid fa-arrow-right text-xs"></i>
                        </button>
                        <button onclick="navigateTo('contribute')" class="px-6 py-3 rounded-xl font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition">
                            Contribute Notes
                        </button>
                    </div>

                    <!-- Learn Today Box -->
                    <div class="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
                        <h2 class="text-base font-bold text-slate-900">What would you like to learn today?</h2>
                        <div class="mt-6 flex flex-row items-center justify-between gap-3 sm:gap-6 overflow-x-auto pb-2 custom-scrollbar">
                            <div onclick="selectSubjectNav('physics')" class="flex-1 min-w-[100px] p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-teal-50/40 hover:border-teal-200 cursor-pointer transition text-center group shrink-0">
                                <div class="w-12 h-12 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center mx-auto mb-2 text-lg font-bold">
                                    <i class="fa-solid fa-atom"></i>
                                </div>
                                <h3 class="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-teal-700">Physics</h3>
                            </div>

                            <div onclick="selectSubjectNav('chemistry')" class="flex-1 min-w-[100px] p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-teal-50/40 hover:border-teal-200 cursor-pointer transition text-center group shrink-0">
                                <div class="w-12 h-12 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center mx-auto mb-2 text-lg font-bold">
                                    <i class="fa-solid fa-flask"></i>
                                </div>
                                <h3 class="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-teal-700">Chemistry</h3>
                            </div>

                            <div onclick="selectSubjectNav('mathematics')" class="flex-1 min-w-[100px] p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-teal-50/40 hover:border-teal-200 cursor-pointer transition text-center group shrink-0">
                                <div class="w-12 h-12 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center mx-auto mb-2 text-lg font-bold">
                                    <i class="fa-solid fa-calculator"></i>
                                </div>
                                <h3 class="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-teal-700">Mathematics</h3>
                            </div>
                        </div>
                    </div>

                    <!-- Banner Box -->
                    <div class="mt-6 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div class="flex items-center space-x-4">
                            <div class="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-lg shrink-0">
                                <i class="fa-solid fa-bullseye"></i>
                            </div>
                            <div>
                                <h3 class="font-bold text-sm text-slate-900">ISC Practice Tests</h3>
                                <p class="text-xs text-slate-500">Start practicing questions and test your concept clarity.</p>
                            </div>
                        </div>
                        <button onclick="navigateTo('resources')" class="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-slate-900 hover:bg-slate-800 transition shrink-0">
                            Start Practicing
                        </button>
                    </div>
                </div>
            `;
        }

        // -----------------------
        // RESOURCES PAGE
        // -----------------------
        function renderResources() {
            const physPct = calculateSubjectCompletion('physics');
            const chemPct = calculateSubjectCompletion('chemistry');
            const mathPct = calculateSubjectCompletion('mathematics');

            const currentList = curriculum[state.selectedSubject][state.selectedClass] || [];

            return `
                <div class="max-w-5xl mx-auto px-4 py-8">
                    
                    <!-- Class Filter Indicator Bar -->
                    <div class="mb-6 flex items-center justify-between">
                        <div class="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700">
                            <i class="fa-solid fa-graduation-cap text-teal-600"></i>
                            <span>Class 11 & 12 for ISC</span>
                        </div>
                    </div>

                    <!-- Top 3 Subject Progress Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        
                        <!-- Physics Card -->
                        <div onclick="switchSubject('physics')" class="p-5 rounded-2xl bg-white border ${state.selectedSubject === 'physics' ? 'border-teal-500 ring-2 ring-teal-500/10' : 'border-slate-200'} cursor-pointer hover:border-teal-400 transition shadow-sm">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center font-bold">
                                    <i class="fa-solid fa-atom"></i>
                                </div>
                                <div>
                                    <h3 class="font-bold text-sm text-slate-900">Physics</h3>
                                    <p class="text-xs text-slate-400">22 Chapters</p>
                                </div>
                            </div>
                            <div class="mt-4">
                                <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                    <div class="bg-rose-500 h-full transition-all duration-500" style="width: ${physPct}%"></div>
                                </div>
                                <span class="text-xs font-bold text-rose-500 mt-2 inline-block">${physPct}% Completed</span>
                            </div>
                        </div>

                        <!-- Chemistry Card -->
                        <div onclick="switchSubject('chemistry')" class="p-5 rounded-2xl bg-white border ${state.selectedSubject === 'chemistry' ? 'border-teal-500 ring-2 ring-teal-500/10' : 'border-slate-200'} cursor-pointer hover:border-teal-400 transition shadow-sm">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center font-bold">
                                    <i class="fa-solid fa-flask"></i>
                                </div>
                                <div>
                                    <h3 class="font-bold text-sm text-slate-900">Chemistry</h3>
                                    <p class="text-xs text-slate-400">20 Chapters</p>
                                </div>
                            </div>
                            <div class="mt-4">
                                <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                    <div class="bg-amber-500 h-full transition-all duration-500" style="width: ${chemPct}%"></div>
                                </div>
                                <span class="text-xs font-bold text-amber-500 mt-2 inline-block">${chemPct}% Completed</span>
                            </div>
                        </div>

                        <!-- Mathematics Card -->
                        <div onclick="switchSubject('mathematics')" class="p-5 rounded-2xl bg-white border ${state.selectedSubject === 'mathematics' ? 'border-teal-500 ring-2 ring-teal-500/10' : 'border-slate-200'} cursor-pointer hover:border-teal-400 transition shadow-sm">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                                    <i class="fa-solid fa-calculator"></i>
                                </div>
                                <div>
                                    <h3 class="font-bold text-sm text-slate-900">Mathematics</h3>
                                    <p class="text-xs text-slate-400">24 Chapters</p>
                                </div>
                            </div>
                            <div class="mt-4">
                                <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                    <div class="bg-teal-600 h-full transition-all duration-500" style="width: ${mathPct}%"></div>
                                </div>
                                <span class="text-xs font-bold text-teal-600 mt-2 inline-block">${mathPct}% Completed</span>
                            </div>
                        </div>

                    </div>

                    <!-- Class Tabs -->
                    <div class="flex space-x-6 border-b border-slate-200 mb-6 text-sm font-bold">
                        <button onclick="switchClass(11)" class="pb-3 transition ${state.selectedClass === 11 ? 'text-teal-600 border-b-2 border-teal-600' : 'text-slate-400 hover:text-slate-600'}">
                            Class XI
                        </button>
                        <button onclick="switchClass(12)" class="pb-3 transition ${state.selectedClass === 12 ? 'text-teal-600 border-b-2 border-teal-600' : 'text-slate-400 hover:text-slate-600'}">
                            Class XII
                        </button>
                    </div>

                    <!-- Subheader -->
                    <div class="p-3 bg-teal-50/60 border border-teal-100 rounded-xl text-xs font-medium text-teal-900 mb-6 flex items-center space-x-2">
                        <i class="fa-solid fa-lightbulb text-teal-600"></i>
                        <span>Challenge yourself with personalized topic questions. Complete each test to increase your subject score!</span>
                    </div>

                    <!-- Chapter / Topic List -->
                    <div class="space-y-3">
                        ${currentList.map((chap, idx) => {
                            const isDone = state.completedTopics[`${state.selectedSubject}_${state.selectedClass}_${idx}`];
                            return `
                                <div class="p-4 bg-white rounded-xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 transition">
                                    <div class="flex items-center space-x-3">
                                        <span class="text-xs font-bold text-teal-600 bg-teal-50 w-7 h-7 rounded-lg flex items-center justify-center shrink-0">
                                            ${String(idx + 1).padStart(2, '0')}
                                        </span>
                                        <div>
                                            <h4 class="text-sm font-bold text-slate-900">${chap.title}</h4>
                                            <p class="text-xs text-slate-400 mt-0.5">1 Practice Question Available</p>
                                        </div>
                                    </div>

                                    <!-- Single Practice Test Action Button -->
                                    <div class="flex items-center space-x-3 shrink-0">
                                        ${isDone ? `
                                            <span class="px-3 py-1 rounded-md text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 flex items-center space-x-1">
                                                <i class="fa-solid fa-check text-xs"></i>
                                                <span>Completed</span>
                                            </span>
                                        ` : ''}
                                        <button onclick="openPracticeModal('${state.selectedSubject}', ${state.selectedClass}, ${idx})" class="px-4 py-2 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-teal-600 hover:text-white transition">
                                            Practice Test
                                        </button>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>

                </div>
            `;
        }

        // -----------------------
        // ABOUT PAGE
        // -----------------------
        function renderAbout() {
            return `
                <div class="max-w-3xl mx-auto px-4 py-12">
                    <div class="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm">
                        <h1 class="text-2xl font-extrabold text-slate-900">About Becules</h1>
                        <p class="text-xs font-bold text-teal-600 uppercase tracking-wider mt-1">Open Source. Not for Profit. Student-Focused.</p>
                        
                        <p class="text-sm text-slate-600 mt-4 leading-relaxed">
                            Becules is a free, open-learning initiative built for ISC Class 11 and 12 students. We know how overwhelming heavy textbooks and unorganized guides can get during exam season. Our mission is to strip away the clutter and give you crisp, high-quality practice materials that actually help you score.
                        </p>

                        <ul class="mt-6 space-y-3 text-xs font-semibold text-slate-700">
                            <li class="flex items-center space-x-2">
                                <i class="fa-solid fa-check-circle text-teal-600 text-sm"></i>
                                <span><strong>No paywalls</strong> or hidden subscriptions.</span>
                            </li>
                            <li class="flex items-center space-x-2">
                                <i class="fa-solid fa-check-circle text-teal-600 text-sm"></i>
                                <span><strong>Zero distractions</strong> with a clean focused interface.</span>
                            </li>
                            <li class="flex items-center space-x-2">
                                <i class="fa-solid fa-check-circle text-teal-600 text-sm"></i>
                                <span><strong>Built by students</strong>, for students across ISC schools.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            `;
        }

        // -----------------------
        // CONTRIBUTE PAGE
        // -----------------------
        function renderContribute() {
            return `
                <div class="max-w-2xl mx-auto px-4 py-12">
                    <div class="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm">
                        <h1 class="text-2xl font-extrabold text-slate-900">Contribute to Becules</h1>
                        <p class="text-xs text-slate-500 mt-1">Got neat formula sheets, or solved problem sets that helped you ace a test? Share them with fellow ISC peers across the country!</p>

                        <div class="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
                            <p><strong>What you can share:</strong> Handwritten or typed chapter summaries, shortcut sheets, or practice questions.</p>
                            <p><strong>How to submit:</strong> Attach your study file and submit your contribution below.</p>
                        </div>

                        <form onsubmit="handleFormSubmit(event)" class="mt-6 space-y-4">
                            <div>
                                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Your name (optional)</label>
                                <input type="text" placeholder="Enter your name" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500">
                            </div>

                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Subject</label>
                                    <select class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500">
                                        <option>Physics</option>
                                        <option>Chemistry</option>
                                        <option>Mathematics</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Class</label>
                                    <select class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500">
                                        <option>Class 11</option>
                                        <option>Class 12</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Material title</label>
                                <input type="text" required placeholder="e.g. Laws of Motion - summary" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500">
                            </div>

                            <!-- New File Upload Input Field -->
                            <div>
                                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Attach File (PDF, Image, Doc)</label>
                                <input type="file" required class="w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer border border-slate-200 rounded-xl bg-slate-50">
                            </div>

                            <button type="submit" class="w-full py-3 rounded-xl font-bold text-xs text-white bg-teal-700 hover:bg-teal-800 transition">
                                Send Contribution
                            </button>
                        </form>
                    </div>
                </div>
            `;
        }

        // Interactions and Actions
        function switchSubject(subj) {
            state.selectedSubject = subj;
            renderMain();
        }

        function switchClass(cls) {
            state.selectedClass = cls;
            renderMain();
        }

        function selectSubjectNav(subj) {
            state.selectedSubject = subj;
            navigateTo('resources');
        }

        function openPracticeModal(subj, cls, idx) {
            const chapData = curriculum[subj][cls][idx];
            state.currentModal = { subj, cls, idx, data: chapData };
            state.selectedOption = null;

            document.getElementById('modal-subject-tag').textContent = subj.toUpperCase();
            document.getElementById('modal-chapter-title').textContent = chapData.title;
            document.getElementById('explanation-box').classList.add('hidden');

            const qBox = document.getElementById('question-box');
            qBox.innerHTML = `
                <p class="text-sm font-bold text-slate-900">${chapData.question}</p>
                <div class="space-y-2 mt-4">
                    ${chapData.options.map((opt, oIdx) => `
                        <button id="opt-btn-${oIdx}" onclick="selectModalOption(${oIdx})" class="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-teal-500 bg-white text-xs font-medium transition flex items-center justify-between">
                            <span>${opt}</span>
                            <div class="w-4 h-4 rounded-full border border-slate-300 opt-circle flex items-center justify-center shrink-0">
                                <div class="opt-inner w-2 h-2 rounded-full bg-teal-600 hidden"></div>
                            </div>
                        </button>
                    `).join('')}
                </div>
            `;

            document.getElementById('practice-modal').classList.remove('hidden');
        }

        function selectModalOption(oIdx) {
            state.selectedOption = oIdx;
            const count = state.currentModal.data.options.length;
            for(let i = 0; i < count; i++) {
                const btn = document.getElementById(`opt-btn-${i}`);
                const dot = btn.querySelector('.opt-inner');
                if (i === oIdx) {
                    btn.className = "w-full text-left p-3 rounded-xl border-2 border-teal-600 bg-teal-50/50 text-xs font-semibold text-teal-900 transition flex items-center justify-between";
                    dot.classList.remove('hidden');
                } else {
                    btn.className = "w-full text-left p-3 rounded-xl border border-slate-200 hover:border-teal-500 bg-white text-xs font-medium transition flex items-center justify-between";
                    dot.classList.add('hidden');
                }
            }
        }

        function submitAnswer() {
            if (state.selectedOption === null) {
                showToast("Please select an option first!");
                return;
            }

            const { subj, cls, idx, data } = state.currentModal;
            const isCorrect = state.selectedOption === data.correct;

            const selectedBtn = document.getElementById(`opt-btn-${state.selectedOption}`);
            const correctBtn = document.getElementById(`opt-btn-${data.correct}`);

            if (isCorrect) {
                selectedBtn.className = "w-full text-left p-3 rounded-xl border-2 border-emerald-500 bg-emerald-50 text-xs font-semibold text-emerald-900 transition flex items-center justify-between";
                showToast("Correct! Topic marked as completed.");
            } else {
                selectedBtn.className = "w-full text-left p-3 rounded-xl border-2 border-rose-500 bg-rose-50 text-xs font-semibold text-rose-900 transition flex items-center justify-between";
                correctBtn.className = "w-full text-left p-3 rounded-xl border-2 border-emerald-500 bg-emerald-50 text-xs font-semibold text-emerald-900 transition flex items-center justify-between";
                showToast("Incorrect. Check the concept solution below.");
            }

            // Mark topic completed and dynamically recalculate subject percentage
            const key = `${subj}_${cls}_${idx}`;
            state.completedTopics[key] = true;

            document.getElementById('explanation-text').textContent = data.exp;
            document.getElementById('explanation-box').classList.remove('hidden');

            // Re-render Resources page behind modal so percentages instantly refresh
            setTimeout(() => {
                if (state.currentPage === 'resources') renderMain();
            }, 300);
        }

        function closeModal() {
            document.getElementById('practice-modal').classList.add('hidden');
        }

        function handleFormSubmit(e) {
            e.preventDefault();
            showToast("Contribution submitted for review!");
            e.target.reset();
        }

        function showToast(msg) {
            const toast = document.getElementById('toast');
            document.getElementById('toast-message').textContent = msg;
            toast.classList.remove('hidden');
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 3000);
        }

        function toggleMobileMenu() {
            document.getElementById('mobile-menu').classList.toggle('hidden');
        }

        // On Load Init
        window.onload = function() {
            renderMain();
        }
    </script>
</body>
</html>
```
