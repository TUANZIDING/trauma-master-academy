(function () {
  const realism = window.TRAUMA_SKILL_REALISM || {};
  const localVisuals = {
    bvm: "../assets/trauma-skills/realism/bvm-team-ventilation.png",
    intubation: "../assets/trauma-skills/realism/intubation.png",
    cricothyrotomy: "../assets/trauma-skills/realism/cricothyrotomy.png",
    "needle-decompression": "../assets/trauma-skills/realism/chest-assessment.png",
    "tube-thoracostomy": "../assets/trauma-skills/realism/tube-thoracostomy.png",
    efast: "../assets/trauma-skills/realism/efast.png",
    tourniquet: "../assets/trauma-skills/realism/tourniquet.png",
    "pelvic-binder": "../assets/trauma-skills/realism/pelvic-risk.png",
    splinting: "../assets/trauma-skills/realism/splinting.png"
  };

  const nodeVisuals = {
    bvm: [
      "../assets/trauma-skills/realism/bvm-01-recognise-inadequate-ventilation.png",
      "../assets/trauma-skills/realism/bvm-02-open-clear-airway.png",
      "../assets/trauma-skills/realism/bvm-team-ventilation.png",
      "../assets/trauma-skills/realism/bvm-04-verify-physiology.png",
      "../assets/trauma-skills/realism/bvm-05-reassess-escalate.png"
    ],
    intubation: [
      "../assets/trauma-skills/realism/airway-intubation-node-01-v2.png",
      "../assets/trauma-skills/realism/airway-intubation-node-02-v2.png",
      "../assets/trauma-skills/realism/airway-intubation-node-03-v2.png",
      "../assets/trauma-skills/realism/airway-intubation-node-04-v2.png",
      "../assets/trauma-skills/realism/airway-intubation-node-05-v2.png"
    ],
    cricothyrotomy: [
      "../assets/trauma-skills/realism/airway-cricothyrotomy-node-01-v2.png",
      "../assets/trauma-skills/realism/airway-cricothyrotomy-node-02-v2.png",
      "../assets/trauma-skills/realism/airway-cricothyrotomy-node-03-v2.png",
      "../assets/trauma-skills/realism/airway-cricothyrotomy-node-04-v2.png",
      "../assets/trauma-skills/realism/airway-cricothyrotomy-node-05-v2.png"
    ],
    "needle-decompression": [
      "../assets/trauma-skills/realism/thoracic-needle-decompression-node-01-v2.png",
      "../assets/trauma-skills/realism/thoracic-needle-decompression-node-02-v2.png",
      "../assets/trauma-skills/realism/thoracic-needle-decompression-node-03-v2.png",
      "../assets/trauma-skills/realism/thoracic-needle-decompression-node-04-v2.png",
      "../assets/trauma-skills/realism/thoracic-needle-decompression-node-05-v2.png"
    ],
    "tube-thoracostomy": [
      "../assets/trauma-skills/realism/thoracic-tube-thoracostomy-node-01-v2.png",
      "../assets/trauma-skills/realism/thoracic-tube-thoracostomy-node-02-v2.png",
      "../assets/trauma-skills/realism/thoracic-tube-thoracostomy-node-03-v2.png",
      "../assets/trauma-skills/realism/thoracic-tube-thoracostomy-node-04-v2.png",
      "../assets/trauma-skills/realism/thoracic-tube-thoracostomy-node-05-v2.png"
    ],
    efast: [
      "../assets/trauma-skills/realism/thoracic-efast-node-01-v2.png",
      "../assets/trauma-skills/realism/thoracic-efast-node-02-v2.png",
      "../assets/trauma-skills/realism/efast-morison-free-fluid-authentic.jpg",
      "../assets/trauma-skills/realism/thoracic-efast-node-04-v2.png",
      "../assets/trauma-skills/realism/thoracic-efast-node-05-v2.png"
    ],
    tourniquet: [
      "../assets/trauma-skills/realism/cir-msk-tourniquet-node-01-v2.png",
      "../assets/trauma-skills/realism/cir-msk-tourniquet-node-02-v2.png",
      "../assets/trauma-skills/realism/cir-msk-tourniquet-node-03-v2.png",
      "../assets/trauma-skills/realism/cir-msk-tourniquet-node-04-v2.png",
      "../assets/trauma-skills/realism/cir-msk-tourniquet-node-05-v2.png"
    ],
    "pelvic-binder": [
      "../assets/trauma-skills/realism/cir-msk-pelvic-binder-node-01-v2.png",
      "../assets/trauma-skills/realism/cir-msk-pelvic-binder-node-02-v2.png",
      "../assets/trauma-skills/realism/cir-msk-pelvic-binder-node-03-v2.png",
      "../assets/trauma-skills/realism/cir-msk-pelvic-binder-node-04-v2.png",
      "../assets/trauma-skills/realism/cir-msk-pelvic-binder-node-05-v2.png"
    ],
    splinting: [
      "../assets/trauma-skills/realism/cir-msk-splinting-node-01-v2.png",
      "../assets/trauma-skills/realism/cir-msk-splinting-node-02-v2.png",
      "../assets/trauma-skills/realism/cir-msk-splinting-node-03-v2.png",
      "../assets/trauma-skills/realism/cir-msk-splinting-node-04-v2.png",
      "../assets/trauma-skills/realism/cir-msk-splinting-node-05-v2.png"
    ]
  };

  (window.TRAUMA_SKILLS || []).forEach((skill) => {
    const detail = realism[skill.id];
    const nodes = Array.isArray(detail) ? detail : detail && detail.nodes;
    if (!Array.isArray(nodes)) return;
    const localVisual = localVisuals[skill.id] || skill.heroImage;
    skill.realismVisual = localVisual;
    skill.heroImage = localVisual;
    skill.competencyRoute = skill.competencyRoute.map((node, index) => {
      const rich = nodes[index] || {};
      const nodeVisual = nodeVisuals[skill.id]?.[index] || localVisual;
      const isLicensedEfastImage = skill.id === "efast" && index === 2;
      const image = rich.thumbnailImage || (rich.mediaKind === "open-image" ? rich.mediaUrl : node.image) || nodeVisual;
      return {
        ...node,
        ...rich,
        image: nodeVisuals[skill.id] ? nodeVisual : image,
        fallbackImage: nodeVisual,
        visualKind: isLicensedEfastImage ? "open-image" : nodeVisuals[skill.id] ? "local-simulation" : rich.visualKind,
        visualAttribution: nodeVisuals[skill.id]
          ? isLicensedEfastImage
            ? "Drahreg01, Morison003.jpg, CC BY-SA 3.0; Wikimedia Commons. Authentic clinical ultrasound for anatomy and free-fluid recognition only."
            : "Trauma Skills Academy original high-fidelity simulation visual; no real-patient data."
          : rich.visualAttribution
      };
    });
    if (nodeVisuals[skill.id] && Array.isArray(skill.storyboard)) {
      const storyboardIndexes = [0, 2, 4];
      skill.storyboard = skill.storyboard.map((scene, index) => {
        const routeIndex = storyboardIndexes[index] ?? index;
        const routeNode = skill.competencyRoute[routeIndex];
        return {
          ...scene,
          image: nodeVisuals[skill.id][routeIndex] || scene.image,
          visualKind: routeNode?.visualKind || "local-simulation",
          visualAttribution: routeNode?.visualAttribution || "Trauma Skills Academy original high-fidelity simulation visual; no real-patient data."
        };
      });
    }
  });
})();
