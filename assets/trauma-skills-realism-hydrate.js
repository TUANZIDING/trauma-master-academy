(function () {
  const realism = window.TRAUMA_SKILL_REALISM || {};
  const sourceBacked = window.TRAUMA_SKILL_SOURCE_BACKED || {};
  (window.TRAUMA_SKILLS || []).forEach((skill) => {
    const detail = realism[skill.id];
    const richNodes = Array.isArray(detail) ? detail : detail?.nodes;
    const pack = sourceBacked[skill.id];
    if (!pack) return;
    skill.sourceBackedHtml = pack.html;
    skill.competencyRoute = skill.competencyRoute.map((node, index) => {
      const rich = richNodes?.[index] || {};
      const media = pack.nodes.find((item) => item.index === index);
      return {
        ...node, ...rich,
        image: media?.image || '', fallbackImage: media?.image || '',
        mediaKind: media?.video ? 'official-link' : media?.image ? 'open-image' : 'task-card-only',
        visualKind: media?.video ? 'official-link' : media?.kind || 'task-card-only',
        mediaUrl: media?.video || media?.source || '', sourceUrl: media?.video || media?.source || '',
        thumbnailImage: '', embedUrl: '',
        mediaTitleZh: node.titleZh, mediaTitleEn: node.titleEn,
        visualAttribution: media?.attribution || '',
        mediaScopeZh: media?.limitZh || '任务卡：无适配的真实图片，不以示意图代替证据。',
        mediaScopeEn: media?.limitEn || 'Task card: no suitable authentic image; a schematic is not evidence.',
        sourceObserveZh: media?.observeZh || '', sourceObserveEn: media?.observeEn || ''
      };
    });
    const hero = pack.nodes.find((item) => item.image);
    skill.heroImage = hero?.image || '';
    skill.realismVisual = skill.heroImage;
    skill.heroAttribution = hero?.attribution || '';
    // Retain authored exercise objectives without presenting them as real video frames.
    skill.storyboard = (skill.storyboard || []).map((scene) => ({...scene, image: skill.heroImage, visualKind:'open-image', visualAttribution:skill.heroAttribution}));
  });
})();
