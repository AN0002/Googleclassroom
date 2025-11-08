// Google Classroom Interactive Script

// Class data storage
const classData = {
  math101: {
    id: "math101",
    name: "Mathematics 101",
    teacher: "Mr. Johnson",
    section: "Section A • Room 204",
    code: "ABCD-1234",
    icon: "M",
    gradient: "linear-gradient(135deg, #4285f4 0%, #34a853 100%)",
    lastUpdate: "Nov 5",
    posts: [
      {
        type: "Assignment",
        title: "Chapter 5: Algebra Review",
        description:
          "Complete exercises 1-20 from Chapter 5. Show all your work and submit by the due date.",
        dueDate: "Nov 12",
        points: "10 pts",
        author: "Mr. Johnson",
      },
      {
        type: "Question",
        title: "Quick check: Linear Equations",
        description: "What is the solution to 2x + 5 = 13?",
        dueDate: "No due date",
        points: "—",
        author: "Mr. Johnson",
      },
      {
        type: "Material",
        title: "Chapter 5 Notes (PDF)",
        description: "Review these notes before the next class.",
        dueDate: "No due date",
        points: "—",
        author: "Mr. Johnson",
      },
    ],
  },
  english201: {
    id: "english201",
    name: "English Literature",
    teacher: "Ms. Williams",
    section: "Section B • Room 301",
    code: "EFGH-5678",
    icon: "E",
    gradient: "linear-gradient(135deg, #ea4335 0%, #fbbc04 100%)",
    lastUpdate: "Nov 3",
    posts: [
      {
        type: "Assignment",
        title: "Essay: Shakespeare Analysis",
        description: "Write a 1000-word essay analyzing the themes in Hamlet.",
        dueDate: "Nov 15",
        points: "50 pts",
        author: "Ms. Williams",
      },
      {
        type: "Material",
        title: "Hamlet - Full Text",
        description: "Read Act 1-3 for next class discussion.",
        dueDate: "No due date",
        points: "—",
        author: "Ms. Williams",
      },
    ],
  },
  science301: {
    id: "science301",
    name: "Biology",
    teacher: "Dr. Smith",
    section: "Section C • Lab 105",
    code: "IJKL-9012",
    icon: "S",
    gradient: "linear-gradient(135deg, #34a853 0%, #0f9d58 100%)",
    lastUpdate: "Nov 4",
    posts: [
      {
        type: "Assignment",
        title: "Lab Report: Cell Structure",
        description: "Complete the lab report on cell structure observations.",
        dueDate: "Nov 10",
        points: "25 pts",
        author: "Dr. Smith",
      },
    ],
  },
  history401: {
    id: "history401",
    name: "World History",
    teacher: "Mr. Davis",
    section: "Section D • Room 402",
    code: "MNOP-3456",
    icon: "H",
    gradient: "linear-gradient(135deg, #9c27b0 0%, #673ab7 100%)",
    lastUpdate: "Nov 2",
    posts: [
      {
        type: "Assignment",
        title: "Research Paper: World War II",
        description:
          "Research and write a 1500-word paper on a topic of your choice related to WWII.",
        dueDate: "Nov 18",
        points: "100 pts",
        author: "Mr. Davis",
      },
    ],
  },
  art501: {
    id: "art501",
    name: "Art & Design",
    teacher: "Ms. Martinez",
    section: "Section E • Studio 201",
    code: "QRST-7890",
    icon: "A",
    gradient: "linear-gradient(135deg, #ff5722 0%, #ff9800 100%)",
    lastUpdate: "Nov 1",
    posts: [
      {
        type: "Assignment",
        title: "Portfolio Project",
        description:
          "Create a portfolio showcasing your best work from this semester.",
        dueDate: "Nov 25",
        points: "75 pts",
        author: "Ms. Martinez",
      },
    ],
  },
  physics601: {
    id: "physics601",
    name: "Physics",
    teacher: "Dr. Brown",
    section: "Section F • Lab 205",
    code: "UVWX-2468",
    icon: "P",
    gradient: "linear-gradient(135deg, #00bcd4 0%, #009688 100%)",
    lastUpdate: "Nov 6",
    posts: [
      {
        type: "Assignment",
        title: "Problem Set: Mechanics",
        description: "Complete problems 1-15 from Chapter 7 on Newton's Laws.",
        dueDate: "Nov 11",
        points: "30 pts",
        author: "Dr. Brown",
      },
    ],
  },
};

let currentClassId = null;
let currentTab = "stream";

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation();
  initializeClassCards();
  initializeTabs();
  initializeModal();
  initializeButtons();
});

// Navigation between home and class views
function initializeNavigation() {
  const homeView = document.getElementById("homeView");
  const classView = document.getElementById("classView");
  const homeLogo = document.getElementById("homeLogo");
  const navLinks = document.querySelectorAll(".nav-link");

  // Logo click - go to home
  homeLogo.addEventListener("click", () => {
    showHomeView();
  });

  // Nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.getAttribute("data-page");

      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      if (page === "home") {
        showHomeView();
      } else if (page === "calendar") {
        alert("Calendar view coming soon!");
      } else if (page === "todo") {
        alert("To-do view coming soon!");
      }
    });
  });
}

function showHomeView() {
  document.getElementById("homeView").style.display = "block";
  document.getElementById("classView").style.display = "none";
  currentClassId = null;
}

function showClassView(classId) {
  const classInfo = classData[classId];
  if (!classInfo) return;

  currentClassId = classId;
  document.getElementById("homeView").style.display = "none";
  document.getElementById("classView").style.display = "block";

  // Update banner
  document.getElementById("bannerTitle").textContent = classInfo.name;
  document.getElementById(
    "bannerSubtitle"
  ).textContent = `${classInfo.teacher} • ${classInfo.section}`;
  document.getElementById("bannerIcon").textContent = classInfo.icon;
  document.getElementById("classBanner").style.background = classInfo.gradient;
  document.getElementById("classCode").textContent = classInfo.code;
  document.getElementById("sidebarClassCode").textContent = classInfo.code;
  document.getElementById("lastUpdate").textContent = classInfo.lastUpdate;

  // Update stream tab content
  updateStreamContent(classInfo);

  // Update classwork tab content
  updateClassworkContent(classInfo);

  // Re-initialize buttons for this class view
  initializeClassViewButtons();

  // Switch to stream tab
  switchTab("stream");
}

// Initialize class cards
function initializeClassCards() {
  const classroomCards = document.querySelectorAll(
    ".classroom-card:not(.create-card)"
  );

  classroomCards.forEach((card) => {
    const classId = card.getAttribute("data-class-id");

    card.addEventListener("click", (e) => {
      if (e.target.closest(".classroom-menu")) {
        return;
      }
      showClassView(classId);
    });

    // Menu button
    const menuBtn = card.querySelector(".classroom-menu");
    if (menuBtn) {
      menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        showClassMenu(classId, menuBtn);
      });
    }
  });
}

function showClassMenu(classId, button) {
  // In a real app, this would show a dropdown menu
  const classInfo = classData[classId];
  const action = confirm(
    `Options for ${classInfo.name}:\n\n1. Archive class\n2. Unenroll\n3. Class settings`
  );
  if (action) {
    console.log("Menu action selected for:", classInfo.name);
  }
}

// Update stream content
function updateStreamContent(classInfo) {
  const streamSection = document.getElementById("stream");
  const postsHTML = classInfo.posts
    .map(
      (post) => `
    <div class="post-card">
      <div class="post-header">
        <div>
          <p class="post-type">${post.type} • <span class="post-author">${
        post.author
      }</span></p>
          <h3 class="post-title">${post.title}</h3>
        </div>
        <div class="post-details">
          ${post.dueDate}<br>${post.points}
        </div>
      </div>
      <p class="post-description">${post.description}</p>
      <div class="post-actions">
        <button class="action-btn" onclick="viewPost('${
          post.title
        }')">View</button>
        ${
          post.type === "Question"
            ? `<button class="action-btn primary" onclick="answerQuestion('${post.title}')">Answer</button>`
            : `<button class="action-btn primary" onclick="markAsDone('${post.title}')">Mark as done</button>`
        }
      </div>
    </div>
  `
    )
    .join("");

  streamSection.innerHTML = postsHTML;
}

// Update classwork content
function updateClassworkContent(classInfo) {
  const classworkSection = document.getElementById("classwork");
  const classworkGrid = classworkSection.querySelector(".classwork-grid");

  if (classworkGrid) {
    const itemsHTML = classInfo.posts
      .map(
        (post) => `
      <div class="classwork-item">
        <h3>${post.title}</h3>
        <p>${post.description}</p>
        <span class="classwork-type">${post.type}</span>
      </div>
    `
      )
      .join("");

    classworkGrid.innerHTML = itemsHTML;
  }
}

// Tab switching
function initializeTabs() {
  const tabs = document.querySelectorAll(".class-tab");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabName = tab.getAttribute("data-tab");
      switchTab(tabName);
    });
  });
}

function switchTab(tabName) {
  currentTab = tabName;

  // Update tab buttons
  document.querySelectorAll(".class-tab").forEach((tab) => {
    tab.classList.remove("active");
    if (tab.getAttribute("data-tab") === tabName) {
      tab.classList.add("active");
    }
  });

  // Update tab sections
  document.querySelectorAll(".tab-section").forEach((section) => {
    section.classList.remove("active");
    if (section.id === tabName) {
      section.classList.add("active");
    }
  });
}

// Modal functions
function initializeModal() {
  const createBtn = document.getElementById("createClassBtn");
  const modal = document.getElementById("createClassModal");
  const closeBtn = document.getElementById("closeModal");
  const cancelBtn = document.getElementById("cancelCreate");
  const createBtnModal = document.getElementById("createClass");

  createBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  closeBtn.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);

  createBtnModal.addEventListener("click", () => {
    const className = document.getElementById("classNameInput").value;
    const section = document.getElementById("sectionInput").value;
    const subject = document.getElementById("subjectInput").value;
    const room = document.getElementById("roomInput").value;

    if (!className.trim()) {
      alert("Please enter a class name");
      return;
    }

    // In a real app, this would create a new class
    alert(`Class "${className}" would be created!`);
    closeModal();

    // Reset form
    document.getElementById("classNameInput").value = "";
    document.getElementById("sectionInput").value = "";
    document.getElementById("subjectInput").value = "";
    document.getElementById("roomInput").value = "";
  });

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

function closeModal() {
  document.getElementById("createClassModal").style.display = "none";
}

// Initialize buttons
function initializeButtons() {
  // Notifications button
  const notificationsBtn = document.getElementById("notificationsBtn");
  if (notificationsBtn) {
    notificationsBtn.addEventListener("click", () => {
      alert("You have 3 new notifications!");
    });
  }

  // Apps button
  const appsBtn = document.getElementById("appsBtn");
  if (appsBtn) {
    appsBtn.addEventListener("click", () => {
      alert("Google Apps menu would open here");
    });
  }
}

// Initialize class view buttons
function initializeClassViewButtons() {
  // View people button
  const viewPeopleBtn = document.getElementById("viewPeopleBtn");
  if (viewPeopleBtn) {
    viewPeopleBtn.onclick = () => {
      switchTab("people");
    };
  }

  // Copy class code
  const copyBtn = document.querySelector(".copy-btn");
  if (copyBtn) {
    copyBtn.onclick = () => {
      const code = document.getElementById("sidebarClassCode").textContent;
      navigator.clipboard.writeText(code).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "Copied!";
        setTimeout(() => {
          copyBtn.textContent = originalText;
        }, 2000);
      });
    };
  }

  // Add button in classwork
  const addBtn = document.querySelector(".add-btn");
  if (addBtn) {
    addBtn.onclick = () => {
      alert("Create assignment dialog would open here");
    };
  }

  // Invite button in people
  const inviteBtn = document.querySelector(".invite-btn");
  if (inviteBtn) {
    inviteBtn.onclick = () => {
      const classCode = currentClassId
        ? classData[currentClassId].code
        : "ABCD-1234";
      alert(`Share this class code to invite students: ${classCode}`);
    };
  }
}

// Post action functions
function viewPost(title) {
  alert(`Viewing: ${title}`);
}

function markAsDone(title) {
  const confirmed = confirm(`Mark "${title}" as done?`);
  if (confirmed) {
    alert(`"${title}" marked as done!`);
  }
}

function answerQuestion(title) {
  const answer = prompt(`Answer the question: ${title}`);
  if (answer) {
    alert(`Your answer has been submitted!`);
  }
}

// Make functions globally available
window.viewPost = viewPost;
window.markAsDone = markAsDone;
window.answerQuestion = answerQuestion;
