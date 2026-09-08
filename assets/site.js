(function () {
  const body = document.body;
  const buttons = Array.from(document.querySelectorAll("[data-set-lang]"));
  const stored = window.localStorage.getItem("trauma-academy-language");

  function setLanguage(lang) {
    body.dataset.lang = lang;
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    buttons.forEach((button) => {
      button.classList.toggle("active", button.dataset.setLang === lang);
    });
    window.localStorage.setItem("trauma-academy-language", lang);
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.setLang));
  });

  setLanguage(stored === "en" ? "en" : "zh");

  const studentStatusCopy = {
    source_required: ["待补充直接来源", "Direct source required"],
    source_verified: ["来源入口已核对", "Source locator checked"],
    source_locator_verified: ["来源定位已核对", "Source location checked"],
    source_index_pending_review: ["来源已登记，待逐条核对", "Source recorded; claim review pending"],
    evidence_review_required: ["待逐条证据核对", "Claim-level evidence review required"],
    evidence_verified: ["主张与证据位置已核对", "Claim and evidence location checked"],
    pending_clinician_review: ["待临床教学审核", "Clinical teaching review pending"],
    pending_specialty_review: ["待相关专科审核", "Specialty review pending"],
    pending_deidentification_review: ["待隐私与脱敏审核", "Privacy and de-identification review pending"],
    privacy_authorized: ["隐私与教学范围已记录", "Privacy and teaching scope recorded"],
    pending_local_confirmation: ["本地流程以院内授权为准", "Local workflow follows institutional authorization"],
    pending_review: ["教学内容持续更新与复核", "Teaching content is maintained and reviewed"],
    visual_asset_pending_review: ["教学示意，非诊断图像", "Teaching visual, not diagnostic imaging"],
    teaching_illustration: ["教学示意，非诊断图像", "Teaching visual, not diagnostic imaging"],
    instructor_authored: ["教师编写合成情境", "Instructor-authored synthetic scenario"],
    teaching_not_protocol: ["教学模拟，非操作规程", "Teaching simulation, not an operating protocol"],
    GO_WITH_CLINICAL_REVIEW: ["结构可用 · 医学逐条审核中", "Structure ready · claim review in progress"]
  };

  function statusMarkup(status) {
    const copy = studentStatusCopy[status];
    return copy ? `<span class="zh">${copy[0]}</span><span class="en">${copy[1]}</span>` : null;
  }

  function renderStudentFacingStatus(element, status) {
    const markup = statusMarkup(status);
    if (!markup || element.classList.contains("audit-code")) return;
    element.classList.remove("pending", "warning", "danger");
    element.classList.add("student-status-aligned");
    element.dataset.studentFacingStatus = status;
    element.innerHTML = markup;
  }

  document.querySelectorAll(".tag[data-review-status], .learner-status[data-review-status]").forEach((element) => {
    renderStudentFacingStatus(element, element.dataset.reviewStatus);
  });

  document.querySelectorAll(".tag, .learner-status").forEach((element) => {
    const rawStatus = element.textContent.trim();
    if (studentStatusCopy[rawStatus]) {
      element.dataset.reviewStatus = element.dataset.reviewStatus || rawStatus;
      renderStudentFacingStatus(element, rawStatus);
    }
  });

  const auditToggle = document.querySelector("[data-toggle-audit]");
  if (auditToggle) {
    auditToggle.addEventListener("click", () => {
      body.dataset.audit = body.dataset.audit === "true" ? "false" : "true";
    });
  }

  const disasterRoot = document.querySelector("[data-disaster-course]");
  if (disasterRoot) {
    const modeButtons = Array.from(disasterRoot.querySelectorAll("[data-disaster-mode-button]"));
    const instructorPanel = disasterRoot.querySelector("[data-instructor-panel]");
    const instructorStatus = disasterRoot.querySelector("[data-instructor-status]");
    const vitalsPanel = disasterRoot.querySelector("[data-disaster-vitals]");
    const debriefPanel = disasterRoot.querySelector("[data-debrief-panel]");
    const caseTitle = disasterRoot.querySelector("[data-disaster-case-title]");
    const caseInfo = disasterRoot.querySelector("[data-disaster-case-info]");
    const caseFeedback = disasterRoot.querySelector("[data-disaster-feedback]");
    const nextButtons = Array.from(disasterRoot.querySelectorAll("[data-disaster-next]"));
    const progressiveSteps = Array.from(disasterRoot.querySelectorAll("[data-progressive-step]"));
    const countdownSelect = disasterRoot.querySelector("[data-countdown-duration]");
    const scoreChoices = disasterRoot.querySelector('[data-disaster-score="choices"]');
    const scoreTime = disasterRoot.querySelector('[data-disaster-score="time"]');
    const scoreState = disasterRoot.querySelector('[data-disaster-score="state"]');
    let disasterMode = "learner";
    let disasterStage = 0;
    let progressiveIndex = 0;
    let disasterChoices = 0;
    let disasterSeconds = 0;
    let disasterPaused = false;
    let countdownSeconds = 0;
    let disasterTimer = null;
    let countdownTimer = null;
    let draggedCard = null;
    let answersVisible = false;
    const initialCardSource = disasterRoot.querySelector("[data-triage-source]");
    const initialResourceStates = {
      casualties: "Strained",
      bays: "Limited",
      or: "Limited",
      blood: "Limited",
      teams: "Limited",
      icu: "Limited",
      ambulances: "Strained",
      transfer: "Limited"
    };

    const disasterStages = [
      {
        titleZh: "院前预警",
        titleEn: "Pre-alert",
        infoZh: "机制和途中表现提示需要完整团队准备，但仍有许多未知信息。",
        infoEn: "The mechanism and en-route appearance suggest whole-team readiness, with many unknowns remaining.",
        preferredZh: "较好方向：建立团队角色、共享 xABCDE 板和资源准备语言。",
        preferredEn: "Better direction: set team roles, a shared xABCDE board, and resource-readiness language.",
        unsafeZh: "风险路径：单线准备会削弱团队对外出血、气道、呼吸和循环的并行关注。",
        unsafeEn: "Risk path: single-lane preparation weakens parallel attention to external bleeding, airway, breathing, and circulation.",
        ctDelayZh: "此选择可能延迟对立即威胁的识别；患者趋势变得更令人担心。回到共享 xABCDE 初评，并在每次干预和新发现后复评。",
        ctDelayEn: "This choice may delay recognition of an immediate threat. The patient's trend becomes more concerning. Return to shared xABCDE assessment and reassess after every intervention and new finding.",
        state: "ready"
      },
      {
        titleZh: "到院交接",
        titleEn: "Arrival handoff",
        infoZh: "可见出血、呼吸表现和躁动信息同时进入团队画面。",
        infoEn: "Visible bleeding, breathing appearance, and agitation enter the team picture together.",
        preferredZh: "较好方向：用观察事实报告 x/B/C 相关担心，并请团队复述已知和未知。",
        preferredEn: "Better direction: report observed x/B/C concerns and ask the team to restate knowns and unknowns.",
        unsafeZh: "风险路径：过早跳到单一资源会造成时间消耗，并使立即威胁和复评问题被后移。",
        unsafeEn: "Risk path: jumping early to one resource consumes time and pushes immediate threats and reassessment questions backward.",
        ctDelayZh: "此选择可能延迟对立即威胁的识别；患者趋势变得更令人担心。回到共享 xABCDE 初评，并在每次干预和新发现后复评。",
        ctDelayEn: "This choice may delay recognition of an immediate threat. The patient's trend becomes more concerning. Return to shared xABCDE assessment and reassess after every intervention and new finding.",
        state: "delay signal"
      },
      {
        titleZh: "早期复评",
        titleEn: "Early reassessment",
        infoZh: "团队行动和新信息出现后，学习者需要说明哪些风险改变，哪些仍未解决。",
        infoEn: "After team action and new information, the learner explains what changed and what remains unresolved.",
        preferredZh: "较好方向：回到 xABCDE，报告改善、恶化或仍不确定的趋势。",
        preferredEn: "Better direction: return to xABCDE and report improved, worsened, or still-uncertain trends.",
        unsafeZh: "风险路径：把一次行动后的短暂变化当作结束点，会削弱持续复评。",
        unsafeEn: "Risk path: treating a short change after one action as the end point weakens continuous reassessment.",
        ctDelayZh: "此选择可能延迟对立即威胁的识别；患者趋势变得更令人担心。回到共享 xABCDE 初评，并在每次干预和新发现后复评。",
        ctDelayEn: "This choice may delay recognition of an immediate threat. The patient's trend becomes more concerning. Return to shared xABCDE assessment and reassess after every intervention and new finding.",
        state: "reassess"
      }
    ];

    function renderDisasterStage() {
      const stage = disasterStages[disasterStage];
      if (caseTitle) {
        caseTitle.innerHTML = bilingual(stage.titleZh, stage.titleEn);
      }
      if (caseInfo) {
        caseInfo.innerHTML = bilingual(stage.infoZh, stage.infoEn);
      }
      if (caseFeedback) {
        caseFeedback.innerHTML = bilingual("请选择路径，观察反馈如何改变时间和复评重点。", "Choose a path and observe how feedback changes time and reassessment focus.");
      }
      if (scoreState) {
        scoreState.textContent = stage.state;
      }
      progressiveSteps.forEach((step) => {
        const stepIndex = Number(step.dataset.progressiveStep || 0);
        step.classList.toggle("is-visible", stepIndex <= progressiveIndex);
      });
    }

    function setAnswerVisibility(visible, scope = disasterRoot) {
      answersVisible = visible;
      body.dataset.disasterAnswers = visible ? "visible" : "hidden";
      scope.querySelectorAll("details.answer-block").forEach((details) => {
        details.classList.toggle("is-answer-visible", visible);
      });
      scope.querySelectorAll(".quiz-explanation").forEach((explanation) => {
        explanation.hidden = !visible;
        explanation.classList.toggle("is-answer-visible", visible);
      });
    }

    function revealQuiz(card) {
      const explanation = card.querySelector(".quiz-explanation");
      if (explanation) {
        explanation.hidden = false;
        explanation.classList.add("is-answer-visible");
      }
      card.classList.add("is-submitted");
    }

    function updateResourceText(key, state) {
      const target = disasterRoot.querySelector(`[data-resource="${key}"]`);
      if (target) {
        target.textContent = state;
        target.dataset.state = state.toLowerCase();
      }
    }

    function setResourceDiscussion(pressureZh, pressureEn, questionZh, questionEn, reassessZh, reassessEn) {
      const pressure = disasterRoot.querySelector("[data-system-pressure]");
      const question = disasterRoot.querySelector("[data-resource-question]");
      const reassessment = disasterRoot.querySelector("[data-resource-reassessment]");
      if (pressure) {
        pressure.innerHTML = bilingual(pressureZh, pressureEn);
      }
      if (question) {
        question.innerHTML = bilingual(questionZh, questionEn);
      }
      if (reassessment) {
        reassessment.innerHTML = bilingual(reassessZh, reassessEn);
      }
    }

    function resetResourcePanel() {
      Object.entries(initialResourceStates).forEach(([key, state]) => updateResourceText(key, state));
      setResourceDiscussion(
        "当前：紧张。请讨论哪些资源最先影响患者流线。",
        "Current: Strained. Discuss which resources affect patient flow first.",
        "哪一类资源变化需要升级给团队负责人？",
        "Which resource change requires escalation to the team lead?",
        "患者优先级和系统容量是否同时改变？",
        "Did patient priority and system capacity change together?"
      );
    }

    function formatTime(seconds) {
      const min = Math.floor(seconds / 60);
      const sec = String(seconds % 60).padStart(2, "0");
      return `${min}:${sec}`;
    }

    function renderTimer() {
      if (scoreTime) {
        scoreTime.textContent = formatTime(disasterSeconds);
      }
    }

    function startDisasterTimer() {
      if (disasterTimer) {
        return;
      }
      disasterTimer = window.setInterval(() => {
        if (!disasterPaused && disasterMode === "challenge") {
          disasterSeconds += 1;
          renderTimer();
        }
      }, 1000);
    }

    function setDisasterMode(mode) {
      disasterMode = mode;
      body.dataset.disasterMode = mode;
      modeButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.disasterModeButton === mode);
      });
      if (instructorPanel) {
        instructorPanel.hidden = mode !== "instructor";
      }
      if (mode === "challenge") {
        startDisasterTimer();
        setAnswerVisibility(false);
      }
      if (mode === "learner" || mode === "instructor") {
        setAnswerVisibility(false);
      }
      if (instructorStatus) {
        instructorStatus.innerHTML = bilingual(
          mode === "instructor" ? "教师模式已开启，可控制信息释放和课堂复盘。" : "当前不在教师模式。",
          mode === "instructor" ? "Instructor mode is active for information release and debrief." : "Instructor mode is not active."
        );
      }
    }

    modeButtons.forEach((button) => {
      button.addEventListener("click", () => setDisasterMode(button.dataset.disasterModeButton));
    });

    disasterRoot.querySelectorAll("[data-disaster-choice]").forEach((button) => {
      button.addEventListener("click", () => {
        const stage = disasterStages[disasterStage];
        const choice = button.dataset.disasterChoice;
        const preferred = choice === "preferred";
        const ctDelay = choice === "ctDelay";
        disasterChoices += 1;
        if (scoreChoices) {
          scoreChoices.textContent = String(disasterChoices);
        }
        if (caseFeedback) {
          caseFeedback.innerHTML = bilingual(ctDelay ? stage.ctDelayZh : preferred ? stage.preferredZh : stage.unsafeZh, ctDelay ? stage.ctDelayEn : preferred ? stage.preferredEn : stage.unsafeEn);
        }
        if (scoreState) {
          scoreState.textContent = preferred ? "coordinated" : "trend more concerning";
        }
        if (ctDelay) {
          disasterSeconds += 45;
          renderTimer();
        }
      });
    });

    nextButtons.forEach((nextButton) => {
      nextButton.addEventListener("click", () => {
        disasterStage = Math.min(disasterStage + 1, disasterStages.length - 1);
        progressiveIndex = Math.min(progressiveIndex + 1, Math.max(progressiveSteps.length - 1, 0));
        disasterSeconds += 30;
        renderDisasterStage();
        renderTimer();
      });
    });

    function updateInstructorStatus(zh, en) {
      if (instructorStatus) {
        instructorStatus.innerHTML = bilingual(zh, en);
      }
    }

    disasterRoot.querySelectorAll("[data-disaster-action]").forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.dataset.disasterAction;
        if (action === "fullscreen") {
          document.documentElement.requestFullscreen?.();
          updateInstructorStatus("已请求全屏展示。", "Full-screen display requested.");
        }
        if (action === "toggleAnswers") {
          setAnswerVisibility(!answersVisible);
          updateInstructorStatus("答案显示状态已切换。", "Answer visibility has been toggled.");
        }
        if (action === "nextInfo") {
          disasterStage = Math.min(disasterStage + 1, disasterStages.length - 1);
          progressiveIndex = Math.min(progressiveIndex + 1, Math.max(progressiveSteps.length - 1, 0));
          renderDisasterStage();
          updateInstructorStatus("已释放下一条合成病例信息。", "Next synthetic case information released.");
        }
        if (action === "pause") {
          disasterPaused = !disasterPaused;
          updateInstructorStatus(disasterPaused ? "场景已暂停。" : "场景已继续。", disasterPaused ? "Scenario paused." : "Scenario resumed.");
        }
        if (action === "deteriorate") {
          const stateTargets = {
            HR: "trend more stressed",
            BP: "trend more concerning",
            SpO2: "trend vulnerable",
            RR: "work increased",
            GCS: "change watch",
            Temperature: "warming risk rising",
            "Elapsed Time": formatTime(disasterSeconds)
          };
          Object.entries(stateTargets).forEach(([key, value]) => {
            const el = disasterRoot.querySelector(`[data-disaster-monitor="${key}"]`);
            if (el) {
              el.textContent = value;
            }
          });
          if (scoreState) {
            scoreState.textContent = "worsening";
          }
          const p6Status = disasterRoot.querySelector('[data-patient-status="P6"]');
          if (p6Status) {
            p6Status.textContent = "Known: abdominal mechanism · Unknown: occult bleeding · Concern: worsening · Resource: reassessment loop · Reassess: priority changed";
          }
          updateInstructorStatus("已触发合成病例趋势恶化。", "Synthetic trend deterioration triggered.");
        }
        if (action === "toggleVitals") {
          if (vitalsPanel) {
            vitalsPanel.hidden = !vitalsPanel.hidden;
          }
          updateInstructorStatus("生命体征趋势面板显示状态已切换。", "Vital-sign trend panel visibility toggled.");
        }
        if (action === "toggleRoles") {
          document.querySelector("#lesson-1")?.scrollIntoView({ behavior: "smooth" });
          updateInstructorStatus("已跳转到团队角色与站位图。", "Moved to team-role and positioning visual.");
        }
        if (action === "countdown") {
          countdownSeconds = Number(countdownSelect?.value || 180);
          window.clearInterval(countdownTimer);
          countdownTimer = window.setInterval(() => {
            countdownSeconds = Math.max(0, countdownSeconds - 1);
            updateInstructorStatus(`课堂倒计时 ${formatTime(countdownSeconds)}`, `Classroom countdown ${formatTime(countdownSeconds)}`);
            if (countdownSeconds === 0) {
              window.clearInterval(countdownTimer);
            }
          }, 1000);
        }
        if (action === "debrief") {
          if (debriefPanel) {
            debriefPanel.hidden = false;
            debriefPanel.scrollIntoView({ behavior: "smooth" });
          }
          updateInstructorStatus("复盘提示已打开。", "Debrief prompts opened.");
        }
        if (action === "reset") {
          disasterStage = 0;
          progressiveIndex = 0;
          disasterChoices = 0;
          disasterSeconds = 0;
          disasterPaused = false;
          setAnswerVisibility(false);
          if (scoreChoices) {
            scoreChoices.textContent = "0";
          }
          renderTimer();
          renderDisasterStage();
          disasterRoot.querySelectorAll("[data-triage-card]").forEach((card) => {
            initialCardSource?.appendChild(card);
          });
          const p6Status = disasterRoot.querySelector('[data-patient-status="P6"]');
          if (p6Status) {
            p6Status.textContent = "Known: abdominal mechanism · Unknown: occult bleeding · Concern: later deterioration · Resource: reassessment loop · Reassess: trend change";
          }
          resetResourcePanel();
          updateInstructorStatus("场景已重置。", "Scenario reset.");
        }
        if (action === "export") {
          const text = [
            "TraumaMaster Academy",
            "Introduction to Trauma Resuscitation and Disaster Medicine",
            "Release state: teaching release, limited educational scope",
            "Lessons: trauma priorities, early threats, disaster response, integrated simulation",
            "Boundary: education and simulation only; no clinical decision support"
          ].join("\n");
          const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
          const link = document.createElement("a");
          link.href = url;
          link.download = "trauma-disaster-lesson-plan.txt";
          link.click();
          URL.revokeObjectURL(url);
          updateInstructorStatus("授课计划已导出为文本文件。", "Lesson plan exported as a text file.");
        }
      });
    });

    disasterRoot.querySelectorAll("[data-quiz-card]").forEach((card) => {
      card.querySelectorAll("[data-quiz-submit]").forEach((button) => {
        button.addEventListener("click", () => {
          disasterChoices += 1;
          card.classList.add("is-submitted");
          if (scoreChoices) {
            scoreChoices.textContent = String(disasterChoices);
          }
          if (disasterMode !== "challenge") {
            revealQuiz(card);
          }
          updateInstructorStatus("学员判断已记录。", "Learner judgment recorded.");
        });
      });
      card.querySelectorAll("[data-quiz-reveal]").forEach((button) => {
        button.addEventListener("click", () => {
          revealQuiz(card);
          updateInstructorStatus("当前题目解释已显示。", "Current explanation revealed.");
        });
      });
    });

    const resourceEvents = {
      newCasualties: {
        states: { casualties: "Unavailable", bays: "Strained", teams: "Strained" },
        pressureZh: "新伤员报告后：系统压力升高，入口队列和复苏空间需要同步复评。",
        pressureEn: "After new casualties: system pressure rises; entry queue and resuscitation space need reassessment.",
        questionZh: "哪些患者需要先被重新观察，而哪些可以等待监测区复评？",
        questionEn: "Which patients need immediate re-observation, and which can wait in monitored areas?",
        reassessZh: "复评伤员数、空间、人员和新危险。",
        reassessEn: "Reassess casualty number, space, staffing, and new hazards."
      },
      orOccupied: {
        states: { or: "Unavailable", transfer: "Strained" },
        pressureZh: "手术室被占用后：院内归处和转运讨论变得更重要。",
        pressureEn: "After an operating room is occupied: destination and transfer discussions become more important.",
        questionZh: "谁需要知道手术能力变化，哪些患者归处需要重新讨论？",
        questionEn: "Who needs to know the operating-capacity change, and which destinations need review?",
        reassessZh: "复评手术能力、下游床位和交接优先级。",
        reassessEn: "Reassess operating capacity, downstream beds, and handover priorities."
      },
      bloodReduced: {
        states: { blood: "Strained", casualties: "Strained" },
        pressureZh: "血液资源减少后：出血风险和资源协调需要更清晰的团队语言。",
        pressureEn: "After blood supply is reduced: bleeding concern and resource coordination need clearer team language.",
        questionZh: "哪些患者有出血担心，哪些资源节点需要被提前沟通？",
        questionEn: "Which patients carry bleeding concern, and which resource nodes need early communication?",
        reassessZh: "复评出血担心、供应状态和外部协同。",
        reassessEn: "Reassess bleeding concern, supply status, and external coordination."
      },
      transferDelayed: {
        states: { transfer: "Unavailable", ambulances: "Strained", icu: "Strained" },
        pressureZh: "转运延迟后：急诊空间、ICU和接收能力成为系统瓶颈。",
        pressureEn: "After transfer delay: ED space, ICU, and receiving capacity become system bottlenecks.",
        questionZh: "哪些患者会因转运延迟而改变观察频率或归处讨论？",
        questionEn: "Which patients change observation frequency or destination discussion because of transfer delay?",
        reassessZh: "复评转运、下游床位、空间和患者等待风险。",
        reassessEn: "Reassess transport, downstream beds, space, and waiting risk."
      },
      teamArrives: {
        states: { teams: "Available", bays: "Limited" },
        pressureZh: "增援团队到达后：人员压力下降，但空间和下游容量仍需复评。",
        pressureEn: "After an additional team arrives: staffing pressure improves, but space and downstream capacity still need reassessment.",
        questionZh: "新增团队最应该接手信息整合、患者观察还是资源联络？",
        questionEn: "Should the new team take over information integration, patient observation, or resource liaison?",
        reassessZh: "复评角色分配、任务重叠和仍未解决的瓶颈。",
        reassessEn: "Reassess role assignment, task overlap, and unresolved bottlenecks."
      },
      icuReduced: {
        states: { icu: "Unavailable", transfer: "Strained" },
        pressureZh: "ICU容量下降后：下游床位和转运计划影响急诊流线。",
        pressureEn: "After ICU capacity drops: downstream beds and transfer planning affect ED flow.",
        questionZh: "哪些交接需要提前说明下游容量不确定？",
        questionEn: "Which handovers need early statement of downstream-capacity uncertainty?",
        reassessZh: "复评ICU、转运、急诊空间和非创伤服务影响。",
        reassessEn: "Reassess ICU, transfer, ED space, and non-trauma service impact."
      }
    };

    disasterRoot.querySelectorAll("[data-resource-event]").forEach((button) => {
      button.addEventListener("click", () => {
        const event = resourceEvents[button.dataset.resourceEvent];
        if (!event) {
          return;
        }
        Object.entries(event.states).forEach(([key, state]) => updateResourceText(key, state));
        setResourceDiscussion(event.pressureZh, event.pressureEn, event.questionZh, event.questionEn, event.reassessZh, event.reassessEn);
        disasterChoices += 1;
        if (scoreChoices) {
          scoreChoices.textContent = String(disasterChoices);
        }
        updateInstructorStatus("资源事件已更新系统压力。", "Resource event updated system pressure.");
      });
    });

    disasterRoot.querySelectorAll("[data-triage-card]").forEach((card) => {
      card.addEventListener("dragstart", () => {
        draggedCard = card;
        card.classList.add("is-moving");
      });
      card.addEventListener("dragend", () => {
        card.classList.remove("is-moving");
      });
    });

    disasterRoot.querySelectorAll("[data-triage-lane]").forEach((lane) => {
      lane.addEventListener("dragover", (event) => event.preventDefault());
      lane.addEventListener("drop", (event) => {
        event.preventDefault();
        if (draggedCard) {
          lane.appendChild(draggedCard);
          draggedCard.classList.remove("is-moving");
          draggedCard = null;
          updateResourcePressure();
        }
      });
    });

    const laneOrder = ["immediate", "delayed", "info"];

    function updateResourcePressure() {
      const immediateCount = disasterRoot.querySelectorAll('[data-triage-lane="immediate"] [data-triage-card]').length;
      const delayedCount = disasterRoot.querySelectorAll('[data-triage-lane="delayed"] [data-triage-card]').length;
      const infoCount = disasterRoot.querySelectorAll('[data-triage-lane="info"] [data-triage-card]').length;
      const bays = disasterRoot.querySelector('[data-resource="bays"]');
      const teams = disasterRoot.querySelector('[data-resource="teams"]');
      const transfer = disasterRoot.querySelector('[data-resource="transfer"]');
      if (bays) {
        bays.textContent = immediateCount >= 2 ? "Strained" : "Limited";
      }
      if (teams) {
        teams.textContent = delayedCount + infoCount >= 3 ? "Strained" : "Limited";
      }
      if (transfer) {
        transfer.textContent = immediateCount + delayedCount >= 4 ? "Strained" : "Limited";
      }
      setResourceDiscussion(
        "分诊板已改变资源压力，请讨论空间、团队和转运是否需要复评。",
        "The triage board changed resource pressure; discuss whether space, teams, and transfer need reassessment.",
        "患者卡移动后，哪个瓶颈最明显？",
        "After moving patient cards, which bottleneck is most visible?",
        "复评患者优先级、空间占用和下游容量。",
        "Reassess patient priority, space occupancy, and downstream capacity."
      );
    }

    function moveCardToNextLane(card) {
      const currentLane = card.closest("[data-triage-lane]");
      const currentIndex = currentLane ? laneOrder.indexOf(currentLane.dataset.triageLane) : -1;
      const nextLane = disasterRoot.querySelector(`[data-triage-lane="${laneOrder[(currentIndex + 1 + laneOrder.length) % laneOrder.length]}"]`);
      if (nextLane && card) {
        nextLane.appendChild(card);
        updateResourcePressure();
      }
    }

    disasterRoot.querySelectorAll("[data-move-card]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        moveCardToNextLane(button.closest("[data-triage-card]"));
      });
    });

    disasterRoot.querySelectorAll("[data-triage-card]").forEach((card) => {
      card.addEventListener("click", () => moveCardToNextLane(card));
    });

    renderDisasterStage();
    resetResourcePanel();
    setAnswerVisibility(false);
    const requestedMode = new URLSearchParams(window.location.search).get("mode");
    setDisasterMode(["learner", "challenge", "instructor"].includes(requestedMode) ? requestedMode : "learner");
  }

  const caseLabRoot = document.querySelector("[data-case-lab]");
  if (caseLabRoot) {
    let submittedCount = 0;
    let releasedIndex = 0;
    const submittedScore = caseLabRoot.querySelector('[data-case-lab-score="submitted"]');
    const releasedScore = caseLabRoot.querySelector('[data-case-lab-score="released"]');
    const releaseCards = Array.from(caseLabRoot.querySelectorAll("[data-case-release]"));
    const monitorStages = Array.from(caseLabRoot.querySelectorAll("[data-case-monitor-stage]"));
    const monitorCounter = caseLabRoot.querySelector("[data-case-monitor-counter]");

    function renderCaseMonitor(stageIndex) {
      monitorStages.forEach((stage) => {
        const isActive = Number(stage.dataset.caseMonitorStage || 0) === stageIndex;
        stage.hidden = !isActive;
        stage.classList.toggle("is-active", isActive);
      });
      if (monitorCounter) {
        const total = Math.max(monitorStages.length, 1);
        monitorCounter.innerHTML = `<span class="zh">阶段 ${stageIndex + 1} / ${total}</span><span class="en">Stage ${stageIndex + 1} / ${total}</span>`;
      }
    }

    function revealCaseLabQuiz(card) {
      const explanation = card.querySelector(".quiz-explanation");
      if (explanation) {
        explanation.hidden = false;
        explanation.classList.add("is-answer-visible");
      }
      card.classList.add("is-submitted");
    }

    function setCaseLabAnswers(visible) {
      caseLabRoot.querySelectorAll(".quiz-explanation").forEach((explanation) => {
        explanation.hidden = !visible;
        explanation.classList.toggle("is-answer-visible", visible);
      });
      caseLabRoot.querySelectorAll(".answer-block").forEach((block) => {
        block.classList.toggle("is-answer-visible", visible);
      });
    }

    function releaseNextCaseLabCard() {
      releasedIndex = Math.min(releasedIndex + 1, Math.max(releaseCards.length - 1, 0));
      releaseCards.forEach((card) => {
        const cardIndex = Number(card.dataset.caseRelease || 0);
        card.classList.toggle("is-visible", cardIndex <= releasedIndex);
      });
      if (releasedScore) {
        releasedScore.textContent = String(releasedIndex);
      }
      renderCaseMonitor(releasedIndex);
    }

    caseLabRoot.querySelectorAll("[data-quiz-card]").forEach((card) => {
      card.querySelectorAll("[data-quiz-submit]").forEach((button) => {
        button.addEventListener("click", () => {
          if (!card.classList.contains("is-submitted")) {
            submittedCount += 1;
            if (submittedScore) {
              submittedScore.textContent = String(submittedCount);
            }
          }
          revealCaseLabQuiz(card);
        });
      });
      card.querySelectorAll("[data-quiz-reveal]").forEach((button) => {
        button.addEventListener("click", () => revealCaseLabQuiz(card));
      });
    });

    caseLabRoot.querySelectorAll("[data-case-lab-action]").forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.dataset.caseLabAction;
        if (action === "showAnswers") {
          setCaseLabAnswers(true);
        }
        if (action === "hideAnswers") {
          setCaseLabAnswers(false);
        }
        if (action === "releaseNext") {
          releaseNextCaseLabCard();
        }
      });
    });

    setCaseLabAnswers(false);
    releaseCards.forEach((card) => {
      const cardIndex = Number(card.dataset.caseRelease || 0);
      card.classList.toggle("is-visible", cardIndex === 0);
    });
    renderCaseMonitor(0);
  }

  const caseRoot = document.querySelector("[data-case-sim]");
  if (!caseRoot) {
    return;
  }

  const caseStages = [
    {
      titleZh: "阶段 1：院前通知",
      titleEn: "Stage 1: Prehospital notification",
      infoZh: "高能量机制，疑似胸部损伤，存在可见出血担心，细节有限。",
      infoEn: "High-energy mechanism, suspected chest injury, visible bleeding concern, limited details.",
      questionZh: "问题：哪些信息未知，但必须先准备？",
      questionEn: "Question: what is still unknown but must be prepared for?",
      monitor: { hr: "elevated", bp: "concerning", spo2: "vulnerable", rr: "increased", gcs: "watch", temp: "warming risk", time: "0 min" },
      preferredZh: "正确方向：先建立团队角色和共享 xABCDE 板，让未知信息也有位置可放。",
      preferredEn: "Preferred direction: set team roles and a shared xABCDE board so unknowns have a place.",
      unsafeZh: "风险路径：只按胸部损伤单线准备，可能延误对出血、气道和循环的同步关注。",
      unsafeEn: "Risk path: preparing only for chest injury may delay parallel attention to bleeding, airway, and circulation."
    },
    {
      titleZh: "阶段 2：患者到达",
      titleEn: "Stage 2: Patient arrival",
      infoZh: "交接中出现胸廓运动担心和床边可见出血线索，团队仍在汇总信息。",
      infoEn: "During handoff there is concern about chest movement and visible bleeding cues while the team gathers information.",
      questionZh: "问题：你先报告哪个可见事实？",
      questionEn: "Question: which visible fact do you report first?",
      monitor: { hr: "more elevated", bp: "more concerning", spo2: "watch closely", rr: "labored trend", gcs: "unchanged", temp: "risk rising", time: "3 min" },
      preferredZh: "正确方向：用中性语言报告可见出血和呼吸表现，让团队回到 x/B/C 同步复评。",
      preferredEn: "Preferred direction: report visible bleeding and breathing appearance in neutral language so the team revisits x/B/C together.",
      unsafeZh: "风险路径：直接追问单项检查会让床边可见信息失去优先级。",
      unsafeEn: "Risk path: jumping to one test can downgrade visible bedside cues."
    },
    {
      titleZh: "阶段 3：再评估",
      titleEn: "Stage 3: Reassessment",
      infoZh: "团队完成初步协调后，学习者需要比较趋势，而不是记住单一数值。",
      infoEn: "After initial team coordination, the learner compares trends rather than memorizing one value.",
      questionZh: "问题：团队处置后，哪些问题仍未解决？",
      questionEn: "Question: after team action, what remains unresolved?",
      monitor: { hr: "trend watched", bp: "trend watched", spo2: "slightly improved", rr: "still monitored", gcs: "recheck", temp: "protect warmth", time: "8 min" },
      preferredZh: "正确方向：回到 x/A/B/C，报告改善、恶化或仍不确定的趋势。",
      preferredEn: "Preferred direction: return to x/A/B/C and report what improved, worsened, or remains unclear.",
      unsafeZh: "风险路径：假设已经稳定而不复评，会掩盖继续恶化的线索。",
      unsafeEn: "Risk path: assuming stability without reassessment can hide deterioration cues."
    }
  ];

  let caseIndex = 0;
  const title = caseRoot.querySelector("[data-case-title]");
  const info = caseRoot.querySelector("[data-case-info]");
  const question = caseRoot.querySelector("[data-case-question]");
  const feedback = caseRoot.querySelector("[data-case-feedback]");

  function bilingual(zh, en) {
    return `<span class="zh">${zh}</span><span class="en">${en}</span>`;
  }

  function renderCaseStage() {
    const stage = caseStages[caseIndex];
    title.innerHTML = bilingual(stage.titleZh, stage.titleEn);
    info.innerHTML = bilingual(stage.infoZh, stage.infoEn);
    question.innerHTML = bilingual(stage.questionZh, stage.questionEn);
    Object.entries(stage.monitor).forEach(([key, value]) => {
      const el = caseRoot.querySelector(`[data-monitor="${key}"]`);
      if (el) {
        el.textContent = value;
      }
    });
    feedback.innerHTML = bilingual("请选择一个路径，观察反馈如何改变时间和复评重点。", "Choose a path and observe how feedback changes time and reassessment focus.");
  }

  caseRoot.querySelectorAll("[data-case-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      const stage = caseStages[caseIndex];
      const preferred = button.dataset.caseChoice === "preferred";
      feedback.innerHTML = bilingual(
        preferred ? stage.preferredZh : stage.unsafeZh,
        preferred ? stage.preferredEn : stage.unsafeEn
      );
    });
  });

  const nextButton = caseRoot.querySelector("[data-case-next]");
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      caseIndex = Math.min(caseIndex + 1, caseStages.length - 1);
      renderCaseStage();
    });
  }

  renderCaseStage();
})();

(() => {
  const iconByLabel = {
    "MENTAL": "mental",
    "PUPILS": "pupils",
    "VOICE": "voice",
    "RESPONSE": "response",
    "HR": "heart-rate",
    "BP": "blood-pressure",
    "RR": "lungs",
    "SPO₂": "oxygen",
    "SPO2": "oxygen",
    "CHEST": "chest",
    "PAIN": "pain",
    "A/D": "airway-neuro",
    "B": "lungs",
    "C": "circulation",
    "E": "exposure",
    "E/R": "exposure"
  };
  const iconFile = new URL("../assets/icons/clinical-signals.svg", document.baseURI).href;

  document.querySelectorAll(".monitor-vital").forEach((card) => {
    if (card.querySelector(".monitor-vital-icon")) return;
    const label = card.querySelector("small")?.textContent.trim().toUpperCase();
    const iconId = iconByLabel[label];
    if (!iconId) return;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    svg.classList.add("monitor-vital-icon");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    use.setAttribute("href", `${iconFile}#${iconId}`);
    svg.append(use);
    card.prepend(svg);
  });
})();

(() => {
  const labs = Array.from(document.querySelectorAll("[data-care-chain-interactions]"));
  if (!labs.length) return;

  const bilingual = (zh, en) => `<span class="zh">${zh}</span><span class="en">${en}</span>`;

  function showFeedback(card, correct, zh, en) {
    const feedback = card.querySelector("[data-interaction-feedback]");
    if (!feedback) return;
    feedback.classList.toggle("is-correct", correct);
    feedback.classList.toggle("is-needs-review", !correct);
    feedback.innerHTML = bilingual(zh, en);
  }

  labs.forEach((lab) => {
    lab.querySelectorAll("[data-check-care-interaction]").forEach((button) => {
      button.addEventListener("click", () => {
        const card = button.closest("[data-interaction-kind]");
        const kind = card?.dataset.interactionKind;
        if (!card || !kind) return;

        if (kind === "handoff") {
          const rows = Array.from(card.querySelectorAll(".sort-row"));
          const completed = rows.every((row) => row.querySelector("select")?.value);
          if (!completed) {
            showFeedback(card, false, "请先完成四项分类。", "Complete all four classifications first.");
            return;
          }
          const correctCount = rows.filter((row) => row.querySelector("select")?.value === row.dataset.answer).length;
          showFeedback(
            card,
            correctCount === rows.length,
            correctCount === rows.length
              ? "分类正确：事实、信息缺口、临床担忧和下一次复评被清楚分开，便于接收团队复述确认。"
              : `当前正确 ${correctCount}/4。先问：这是已经观察到的事实、仍需核实的信息、需要团队注意的担忧，还是明确的复评任务？`,
            correctCount === rows.length
              ? "Correct: facts, information gaps, clinical concerns, and the next reassessment are separated clearly for receiver check-back."
              : `${correctCount}/4 correct. Ask whether each item is an observed fact, information still to verify, a concern for the team, or an explicit reassessment task.`
          );
        }

        if (kind === "resources") {
          const checks = Array.from(card.querySelectorAll('input[type="checkbox"]'));
          const correct = checks.every((input) => input.checked === (input.dataset.correct === "true"));
          showFeedback(
            card,
            correct,
            correct
              ? "识别正确。下一步应继续区分：已预警、已联络、可用、受限或责任人未明确；“被提到”不等于“已经就绪”。"
              : "请只根据交接原文识别资源。注意：待协调或责任人未明确的资源仍然属于“已被提到”。",
            correct
              ? "Correct. Next distinguish alerted, contacted, available, limited, or without a clear owner; mentioned does not mean ready."
              : "Use only the handoff wording. A resource that is pending coordination or lacks a clear owner is still mentioned."
          );
        }

        if (kind === "language") {
          const selected = card.querySelector('input[type="radio"]:checked');
          if (!selected) {
            showFeedback(card, false, "请先选择一句团队表达。", "Choose one team phrase first.");
            return;
          }
          const correct = selected.dataset.correct === "true";
          showFeedback(
            card,
            correct,
            correct
              ? "表达合适：它先陈述持续异常，再提出重新整合信息的明确请求，并要求复述未解决问题，能够形成闭环。"
              : "这句话可能造成过早结束或延迟复评。更好的表达应说明当前变化、提出重新整合 xABCDE 的请求，并明确由接收者复述重点。",
            correct
              ? "Appropriate: it states the persistent abnormality, requests renewed integration, and asks for read-back of unresolved problems to close the loop."
              : "This wording may prematurely stop or delay reassessment. Better wording states the change, requests renewed xABCDE integration, and asks the receiver to repeat the key point."
          );
        }
      });
    });
  });
})();
