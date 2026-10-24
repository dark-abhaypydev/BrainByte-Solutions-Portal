// BrainByte Solutions - Central Application Data & State

export const INITIAL_USER = {
  id: "usr_rahul",
  name: "Rahul Sharma",
  role: "Student",
  email: "rahul.sharma@example.com",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  enrolledCourseCount: 3,
  completedLessons: 12,
  totalLessons: 48,
  overallProgress: 25,
  averageScore: 78,
  completedTests: 4,
  totalTests: 5,
};

export const INSTRUCTOR_DATA = {
  id: "inst_sharma",
  name: "Dr. Amit Sharma",
  role: "Lead AI & ML Instructor",
  title: "Ex-Google DeepMind Researcher, Ph.D. in Machine Learning",
  email: "amit.sharma@brainbyte.ai",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  totalStudents: 248,
  totalCourses: 6,
  totalRevenue: 48500,
  completionRate: 72,
  rating: 4.9,
};

export const COURSES_DATA = [
  {
    id: "py-ml",
    title: "Python for Machine Learning",
    category: "Beginner",
    description: "Learn Python, data analysis, NumPy, Pandas and data visualization fundamentals.",
    modulesCount: 6,
    durationHours: 20,
    price: 1499,
    originalPrice: 2999,
    enrolled: true,
    progress: 66,
    rating: 4.9,
    studentsCount: 1240,
    accentColor: "from-blue-500 to-cyan-400",
    icon: "python",
    level: "Beginner",
    instructor: "Dr. Amit Sharma",
    featured: true,
    tags: ["Python", "NumPy", "Pandas", "Matplotlib"],
    modules: [
      {
        id: "m1",
        title: "Module 1: Python Fundamentals for AI",
        duration: "3h 15m",
        lessons: [
          { id: "l1", title: "Python Syntax, Variables & Types", duration: "25m", completed: true },
          { id: "l2", title: "Data Structures: Lists, Dicts, Tuples & Sets", duration: "40m", completed: true },
          { id: "l3", title: "Functional Programming & Comprehensions", duration: "35m", completed: true }
        ]
      },
      {
        id: "m2",
        title: "Module 2: NumPy for Numerical Computing",
        duration: "4h 00m",
        lessons: [
          { id: "l4", title: "N-dimensional Arrays & Vectorization", duration: "45m", completed: true },
          { id: "l5", title: "Matrix Operations & Linear Algebra", duration: "50m", completed: true },
          { id: "l6", title: "Broadcasting & Memory Optimization", duration: "35m", completed: true }
        ]
      },
      {
        id: "m3",
        title: "Module 3: Pandas for Data Wrangling",
        duration: "4h 30m",
        lessons: [
          { id: "l7", title: "Series & DataFrames Deep Dive", duration: "45m", completed: true },
          { id: "l8", title: "Handling Missing Values & Outliers", duration: "50m", completed: true }
        ]
      },
      {
        id: "m4",
        title: "Module 4: Advanced Data Preprocessing",
        duration: "3h 45m",
        lessons: [
          { id: "l9", title: "Feature Scaling & Standardization", duration: "40m", completed: false },
          { id: "l10", title: "Categorical Encoding Techniques", duration: "45m", completed: false }
        ]
      }
    ]
  },
  {
    id: "complete-ml",
    title: "Complete Machine Learning",
    category: "Intermediate",
    description: "Regression, classification, clustering, model evaluation and real-world portfolio projects.",
    modulesCount: 12,
    durationHours: 45,
    price: 3499,
    originalPrice: 6999,
    enrolled: true,
    progress: 20,
    rating: 4.95,
    studentsCount: 890,
    accentColor: "from-indigo-500 to-purple-500",
    icon: "chart",
    level: "Intermediate",
    instructor: "Dr. Amit Sharma",
    featured: true,
    tags: ["Scikit-Learn", "Regression", "XGBoost", "Clustering"],
    modules: [
      {
        id: "cml_m1",
        title: "1. Introduction to Machine Learning",
        duration: "2h 30m",
        lessons: [
          { id: "cml_l1", title: "1.1 What is Machine Learning?", duration: "20m", completed: true },
          { id: "cml_l2", title: "1.2 Supervised vs Unsupervised Learning", duration: "35m", completed: true },
          { id: "cml_l3", title: "1.3 Setting Up Google Colab & VS Code", duration: "25m", completed: true }
        ]
      },
      {
        id: "cml_m2",
        title: "2. Data Preprocessing & Cleaning",
        duration: "4h 00m",
        lessons: [
          { id: "cml_l4", title: "2.1 Handling Imbalanced Datasets", duration: "40m", completed: true },
          { id: "cml_l5", title: "2.2 Feature Engineering & Selection", duration: "50m", completed: true }
        ]
      },
      {
        id: "cml_m3",
        title: "3. Exploratory Data Analysis (EDA)",
        duration: "3h 45m",
        lessons: [
          { id: "cml_l6", title: "3.1 Visualizing Distributions & Correlations", duration: "45m", completed: true },
          { id: "cml_l7", title: "3.2 Outlier Detection with IQR & Z-score", duration: "40m", completed: false }
        ]
      },
      {
        id: "cml_m4",
        title: "4. Model Evaluation & Validation",
        duration: "5h 15m",
        isCurrent: true,
        lessons: [
          { id: "cml_l8", title: "4.1 Evaluation Metrics (Precision, Recall, F1)", duration: "35m", completed: true, isCurrent: true },
          { id: "cml_l9", title: "4.2 Confusion Matrix & ROC-AUC Curve", duration: "45m", completed: false },
          { id: "cml_l10", title: "4.3 K-Fold Cross Validation", duration: "40m", completed: false }
        ]
      },
      {
        id: "cml_m5",
        title: "5. Hyperparameter Tuning",
        duration: "3h 30m",
        lessons: [
          { id: "cml_l11", title: "5.1 GridSearchCV vs RandomizedSearchCV", duration: "45m", completed: false },
          { id: "cml_l12", title: "5.2 Bayesian Optimization with Optuna", duration: "50m", completed: false }
        ]
      },
      {
        id: "cml_m6",
        title: "6. Real-World Capstone Projects",
        duration: "8h 00m",
        lessons: [
          { id: "cml_l13", title: "6.1 Customer Churn Prediction System", duration: "2h 30m", completed: false },
          { id: "cml_l14", title: "6.2 Credit Card Fraud Detection", duration: "2h 45m", completed: false }
        ]
      }
    ]
  },
  {
    id: "deep-learning",
    title: "Deep Learning & AI Projects",
    category: "Advanced",
    description: "Neural networks, CNN, RNN, Transformers, transfer learning and end-to-end portfolio projects.",
    modulesCount: 10,
    durationHours: 35,
    price: 5999,
    originalPrice: 9999,
    enrolled: true,
    progress: 10,
    rating: 4.98,
    studentsCount: 640,
    accentColor: "from-pink-500 to-rose-500",
    icon: "brain",
    level: "Advanced",
    instructor: "Dr. Amit Sharma",
    featured: true,
    tags: ["PyTorch", "TensorFlow", "CNN", "Transformers"],
    modules: [
      {
        id: "dl_m1",
        title: "Module 1: Foundations of Neural Networks",
        duration: "3h 30m",
        lessons: [
          { id: "dl_l1", title: "Perceptrons & Multi-Layer Perceptrons (MLP)", duration: "40m", completed: true },
          { id: "dl_l2", title: "Activation Functions (ReLU, GELU, Sigmoid)", duration: "35m", completed: true },
          { id: "dl_l3", title: "Backpropagation & Gradient Descent from Scratch", duration: "55m", completed: false }
        ]
      },
      {
        id: "dl_m2",
        title: "Module 2: Convolutional Neural Networks (CNNs)",
        duration: "6h 00m",
        lessons: [
          { id: "dl_l4", title: "Convolutions, Pooling, Padding & Strides", duration: "50m", completed: false },
          { id: "dl_l5", title: "ResNet, EfficientNet & Transfer Learning", duration: "1h 15m", completed: false }
        ]
      }
    ]
  },
  {
    id: "data-science",
    title: "Data Science with Python",
    category: "Beginner",
    description: "Data cleaning, exploratory visualization and advanced statistical analytics.",
    modulesCount: 8,
    durationHours: 25,
    price: 2699,
    originalPrice: 4999,
    enrolled: false,
    progress: 0,
    rating: 4.85,
    studentsCount: 530,
    accentColor: "from-cyan-500 to-blue-500",
    icon: "database",
    level: "Beginner",
    instructor: "Dr. Amit Sharma",
    tags: ["Statistics", "Seaborn", "SQL", "Tableau"]
  },
  {
    id: "mlops",
    title: "MLOps & Model Deployment",
    category: "Intermediate",
    description: "Deploy ML models with Docker, FastAPI, MLflow, CI/CD pipelines and cloud platforms (AWS/GCP).",
    modulesCount: 8,
    durationHours: 22,
    price: 3999,
    originalPrice: 7499,
    enrolled: false,
    progress: 0,
    rating: 4.88,
    studentsCount: 410,
    accentColor: "from-purple-500 to-indigo-500",
    icon: "server",
    level: "Intermediate",
    instructor: "Er. Vikram Mehra",
    tags: ["Docker", "FastAPI", "MLflow", "Kubernetes", "AWS"]
  },
  {
    id: "computer-vision",
    title: "Computer Vision with OpenCV",
    category: "Advanced",
    description: "Image processing, object detection (YOLOv8, YOLOv10), segmentation and real-world vision applications.",
    modulesCount: 10,
    durationHours: 30,
    price: 4699,
    originalPrice: 8499,
    enrolled: false,
    progress: 0,
    rating: 4.92,
    studentsCount: 370,
    accentColor: "from-emerald-500 to-teal-400",
    icon: "camera",
    level: "Advanced",
    instructor: "Dr. Amit Sharma",
    tags: ["OpenCV", "YOLOv8", "Segmentation", "Face Recognition"]
  },
  {
    id: "gen-ai",
    title: "Generative AI & LLM Mastery",
    category: "Advanced",
    description: "Build production AI apps with OpenAI, Claude, LangChain, LlamaIndex, RAG pipelines & Fine-tuning.",
    modulesCount: 12,
    durationHours: 40,
    price: 6499,
    originalPrice: 12999,
    enrolled: false,
    progress: 0,
    rating: 4.99,
    studentsCount: 780,
    accentColor: "from-amber-500 to-yellow-400",
    icon: "sparkles",
    level: "Advanced",
    instructor: "Dr. Amit Sharma",
    tags: ["LangChain", "RAG", "Llama-3", "Prompt Engineering", "Vector DBs"]
  }
];

export const LIVE_CLASSES = [
  {
    id: "live-1",
    title: "Machine Learning Fundamentals",
    courseId: "complete-ml",
    time: "Today, 7:00 PM - 8:30 PM",
    instructor: "Dr. Amit Sharma",
    status: "live_now", // "live_now", "upcoming", "past"
    badge: "Join Now",
    participants: 148,
    agenda: "Hands-on Supervised Learning: Linear & Logistic Regression with live code walkthrough and doubt clearing.",
    isLive: true,
  },
  {
    id: "live-2",
    title: "Live Q&A & Code Debugging Session",
    courseId: "py-ml",
    time: "Tomorrow, 5:00 PM - 6:00 PM",
    instructor: "Dr. Amit Sharma",
    status: "upcoming",
    badge: "Remind Me",
    participants: 94,
    agenda: "Bring your assignments, bug reports and code errors. Dr. Sharma will live-debug student submissions.",
    isLive: false,
  },
  {
    id: "live-3",
    title: "Deep Learning & Transformers Workshop",
    courseId: "deep-learning",
    time: "Sunday, 4:00 PM - 6:00 PM",
    instructor: "Dr. Amit Sharma",
    status: "upcoming",
    badge: "Register",
    participants: 215,
    agenda: "Attention Mechanism & Self-Attention mathematics explained visually with PyTorch implementation.",
    isLive: false,
  },
  {
    id: "live-4",
    title: "GenAI: Building an Autonomous RAG Agent",
    courseId: "gen-ai",
    time: "Next Tuesday, 7:30 PM - 9:00 PM",
    instructor: "Dr. Amit Sharma",
    status: "upcoming",
    badge: "Register",
    participants: 310,
    agenda: "From basic embeddings to hybrid search with ChromaDB and LangGraph agents.",
    isLive: false,
  }
];

export const PAST_RECORDINGS = [
  {
    id: "rec-1",
    title: "Machine Learning Fundamentals - Session 1",
    date: "Yesterday",
    duration: "1 hour 32 mins",
    views: 342,
    slidesUrl: "#",
    notebookUrl: "#"
  },
  {
    id: "rec-2",
    title: "Deep Learning Workshop: Backpropagation Deep Dive",
    date: "3 days ago",
    duration: "1 hour 48 mins",
    views: 521,
    slidesUrl: "#",
    notebookUrl: "#"
  },
  {
    id: "rec-3",
    title: "Pandas & Data Wrangling Live Masterclass",
    date: "1 week ago",
    duration: "2 hours 10 mins",
    views: 689,
    slidesUrl: "#",
    notebookUrl: "#"
  }
];

export const PRACTICE_CHALLENGES = [
  {
    id: "challenge-1",
    title: "Data Analysis with Pandas",
    category: "Python 3",
    difficulty: "Beginner",
    description: "Load the dataset and compute the average height and filter candidates above 175cm.",
    defaultCode: `import pandas as pd
import numpy as np

# Sample dataset
data = {
    'age': [25, 30, 28, 35, 22],
    'height': [175, 180, 168, 172, 178],
    'weight': [70, 80, 65, 75, 72]
}

df = pd.DataFrame(data)
print("=== Dataset Head ===")
print(df.head())

# Calculate average height
avg_height = df['height'].mean()
print(f"\\nAverage Height: {avg_height:.2f} cm")

# Filter candidates > 175cm
tall_candidates = df[df['height'] > 175]
print("\\nCandidates taller than 175cm:")
print(tall_candidates)
`,
    expectedColumns: ['age', 'height', 'weight'],
    expectedRows: [
      { age: 25, height: 175, weight: 70 },
      { age: 30, height: 180, weight: 80 },
      { age: 28, height: 168, weight: 65 },
      { age: 35, height: 172, weight: 75 },
      { age: 22, height: 178, weight: 72 }
    ]
  },
  {
    id: "challenge-2",
    title: "Confusion Matrix & Evaluation Metrics",
    category: "Machine Learning",
    difficulty: "Intermediate",
    description: "Calculate Precision, Recall and F1-Score from given True Positive, False Positive, and False Negative counts.",
    defaultCode: `def calculate_metrics(tp, fp, fn, tn):
    accuracy = (tp + tn) / (tp + tn + fp + fn)
    precision = tp / (tp + fp) if (tp + fp) > 0 else 0
    recall = tp / (tp + fn) if (tp + fn) > 0 else 0
    f1 = 2 * (precision * recall) / (precision + recall) if (precision + recall) > 0 else 0
    
    return {
        "Accuracy": round(accuracy, 4),
        "Precision": round(precision, 4),
        "Recall": round(recall, 4),
        "F1-Score": round(f1, 4)
    }

metrics = calculate_metrics(tp=85, fp=15, fn=10, tn=90)
for k, v in metrics.items():
    print(f"{k}: {v * 100:.1f}%")
`,
    expectedOutput: "Accuracy: 87.5%\nPrecision: 85.0%\nRecall: 89.5%\nF1-Score: 87.2%"
  },
  {
    id: "challenge-3",
    title: "Neural Network Forward Pass (NumPy)",
    category: "Deep Learning",
    difficulty: "Intermediate",
    description: "Implement a 2-layer neural network forward pass using ReLU and Sigmoid activations.",
    defaultCode: `import numpy as np

def relu(x):
    return np.maximum(0, x)

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

# Inputs: 3 features, batch size 2
X = np.array([[0.5, 1.2, -0.8],
              [1.1, -0.4, 0.9]])

# Weights & Biases
W1 = np.random.randn(3, 4) * 0.1
b1 = np.zeros((1, 4))
W2 = np.random.randn(4, 1) * 0.1
b2 = np.zeros((1, 1))

# Forward pass
Z1 = np.dot(X, W1) + b1
A1 = relu(Z1)
Z2 = np.dot(A1, W2) + b2
output = sigmoid(Z2)

print("Layer 1 Hidden Activations shape:", A1.shape)
print("Output Predictions:", np.round(output, 4).flatten())
`
  }
];

export const QUIZZES_DATA = [
  {
    id: "quiz-py-basics",
    title: "Python Basics Quiz",
    category: "Python",
    difficulty: "Beginner",
    totalQuestions: 10,
    timeLimitMinutes: 15,
    questions: [
      {
        id: "q1",
        question: "Which of the following data structures in Python is immutable?",
        options: ["List", "Dictionary", "Tuple", "Set"],
        correctIndex: 2,
        explanation: "Tuples in Python are immutable, meaning their elements cannot be modified, added, or removed once created."
      },
      {
        id: "q2",
        question: "What is the primary library used for fast numerical and vector computations in Python?",
        options: ["Pandas", "NumPy", "Matplotlib", "Requests"],
        correctIndex: 1,
        explanation: "NumPy provides support for large multidimensional arrays and high-speed mathematical functions implemented in C."
      },
      {
        id: "q3",
        question: "What does the .iloc[] indexer in Pandas do?",
        options: [
          "Selects by label/column name",
          "Selects by integer index position",
          "Deletes columns conditionally",
          "Filters null values"
        ],
        correctIndex: 1,
        explanation: ".iloc is purely integer-location based indexing for selection by position."
      },
      {
        id: "q4",
        question: "In Python, which keyword is used to create an anonymous function?",
        options: ["def", "func", "lambda", "inline"],
        correctIndex: 2,
        explanation: "The `lambda` keyword allows creating small, anonymous one-line functions in Python."
      },
      {
        id: "q5",
        question: "What will `np.zeros((2, 3)).shape` evaluate to?",
        options: ["(3, 2)", "(2, 3)", "(6,)", "6"],
        correctIndex: 1,
        explanation: "It creates a 2-row by 3-column array of zeros with shape (2, 3)."
      }
    ]
  },
  {
    id: "quiz-ml-fund",
    title: "Machine Learning Fundamentals",
    category: "Machine Learning",
    difficulty: "Intermediate",
    totalQuestions: 15,
    timeLimitMinutes: 25,
    questions: [
      {
        id: "ml_q1",
        question: "Which algorithm is suitable for Supervised Classification problems?",
        options: ["K-Means", "Random Forest Classifier", "PCA", "DBSCAN"],
        correctIndex: 1,
        explanation: "Random Forest Classifier is a supervised ensemble algorithm used for classification tasks."
      },
      {
        id: "ml_q2",
        question: "What problem occurs when a model performs exceptionally on training data but poorly on test data?",
        options: ["Underfitting", "Overfitting (High Variance)", "High Bias", "Data Leakage"],
        correctIndex: 1,
        explanation: "Overfitting happens when a model learns the training noise rather than generalizable patterns."
      },
      {
        id: "ml_q3",
        question: "What metric is most suitable for evaluating a model on an imbalanced fraud detection dataset?",
        options: ["Accuracy", "F1-Score / PR-AUC", "Mean Squared Error", "R-Squared"],
        correctIndex: 1,
        explanation: "In highly imbalanced datasets, accuracy can be misleading. F1-score balances precision and recall."
      }
    ]
  },
  {
    id: "quiz-model-eval",
    title: "Model Evaluation Quiz",
    category: "Machine Learning",
    difficulty: "Intermediate",
    totalQuestions: 12,
    timeLimitMinutes: 20,
    questions: [
      {
        id: "eval_q1",
        question: "In a confusion matrix, what is a False Positive (Type I Error)?",
        options: [
          "Predicted Positive, Actual Negative",
          "Predicted Negative, Actual Positive",
          "Predicted Positive, Actual Positive",
          "Predicted Negative, Actual Negative"
        ],
        correctIndex: 0,
        explanation: "A False Positive occurs when the model predicts positive (e.g. cancer), but the ground truth is negative."
      },
      {
        id: "eval_q2",
        question: "What does an ROC Curve plot?",
        options: [
          "True Positive Rate vs False Positive Rate",
          "Precision vs Recall",
          "Loss vs Epochs",
          "Accuracy vs Learning Rate"
        ],
        correctIndex: 0,
        explanation: "ROC plots True Positive Rate (Sensitivity) on the Y-axis against False Positive Rate (1 - Specificity) on the X-axis."
      }
    ]
  }
];

export const CERTIFICATES_DATA = [
  {
    id: "cert-bbs-2025-01",
    studentName: "Rahul Sharma",
    courseTitle: "Python for Machine Learning",
    issueDate: "April 26, 2025",
    verificationId: "BBS-2025-ML-8942",
    instructorName: "Dr. Amit Sharma",
    directorName: "Prof. S. R. Singhania",
    grade: "Grade A+ (Distinction)",
    hours: "20 Hours",
    skills: ["Python 3", "NumPy", "Pandas", "EDA", "Data Visualization"],
    imageUrl: "/brainbyte-logo.jpg"
  }
];

export const PRICING_PLANS = [
  {
    id: "plan-basic",
    name: "Basic",
    price: 1499,
    originalPrice: 2999,
    period: "one-time",
    subtitle: "Python for ML Access",
    badge: null,
    features: [
      "Full access to Python for ML course",
      "6 modules & 20 hours video lessons",
      "Lifetime access to recordings",
      "Certificate of Completion",
      "Community forum access",
      "Standard email support"
    ],
    buttonText: "Buy Now",
    isPopular: false
  },
  {
    id: "plan-pro",
    name: "Pro",
    price: 3499,
    originalPrice: 6999,
    period: "one-time",
    subtitle: "Complete ML + Practice Labs",
    badge: "Most Popular",
    features: [
      "Access to Complete Machine Learning",
      "12 modules & 45 hours structured lessons",
      "Interactive Practice Lab & Code Runner",
      "Weekly Live Q&A Sessions with Dr. Sharma",
      "All Tests, Quizzes & Graded Assignments",
      "Verified Industry Certificate with QR",
      "Dedicated Discord Mentorship Group"
    ],
    buttonText: "Buy Now",
    isPopular: true
  },
  {
    id: "plan-premium",
    name: "Premium",
    price: 7999,
    originalPrice: 15999,
    period: "one-time",
    subtitle: "All Courses + GenAI + 1-on-1 Mentorship",
    badge: "VIP Access",
    features: [
      "All 6+ Courses (ML, Deep Learning, GenAI, MLOps)",
      "120+ hours content with ongoing updates",
      "Unlimited Live Classes access",
      "1-on-1 Portfolio & Resume Review",
      "Mock Interviews with Senior AI Engineers",
      "100% Placement & Referral Support",
      "Direct WhatsApp & Call line with Mentors"
    ],
    buttonText: "Buy Now",
    isPopular: false
  }
];

export const COMMUNITY_POSTS = [
  {
    id: "post-1",
    author: {
      name: "Aakash Gupta",
      role: "Student",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
    },
    title: "How to handle extreme class imbalance in Credit Card Fraud dataset?",
    content: "Hey everyone! While working on Module 4 Capstone, the dataset has 99.8% non-fraud and only 0.2% fraud cases. Standard logistic regression achieves 99.8% accuracy but misses most fraud! Should I use SMOTE oversampling or focal loss?",
    tag: "Machine Learning",
    timestamp: "2 hours ago",
    upvotes: 24,
    commentsCount: 6,
    hasInstructorAnswer: true,
    instructorReply: {
      author: "Dr. Amit Sharma",
      role: "Instructor",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      content: "Great question Aakash! Use SMOTE combined with RandomUnderSampler from imblearn. More importantly, switch your metric from Accuracy to PR-AUC (Precision-Recall AUC) and tune your decision threshold. We will cover this in detail in today's live class at 7:00 PM!"
    }
  },
  {
    id: "post-2",
    author: {
      name: "Pooja Varma",
      role: "Student",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
    },
    title: "Passed the Python Basics Quiz with 100%! Practice lab helped a ton!",
    content: "Just completed the Python for ML module and scored full marks on the assessment. The interactive dataframe queries in the practice lab made concepts crystal clear. Moving to Complete ML next!",
    tag: "Milestone",
    timestamp: "5 hours ago",
    upvotes: 42,
    commentsCount: 9,
    hasInstructorAnswer: false
  }
];
