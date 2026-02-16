import type { PersonaExtractionData, ProfileExtractionData, ExtractionType } from '@/hooks/useDocumentExtraction';

/**
 * Merges multiple extraction results into one, preferring non-null values
 * and combining arrays with deduplication. Later extractions take priority
 * for scalar fields (last-write-wins for strings).
 */
export function mergeExtractions<T extends PersonaExtractionData | ProfileExtractionData>(
  results: T[],
  type: ExtractionType
): T {
  if (results.length === 0) throw new Error('No results to merge');
  if (results.length === 1) return results[0];

  if (type === 'persona') {
    return mergePersonas(results as PersonaExtractionData[]) as T;
  }
  return mergeProfiles(results as ProfileExtractionData[]) as T;
}

function mergePersonas(results: PersonaExtractionData[]): PersonaExtractionData {
  const merged: PersonaExtractionData = {
    name: null,
    email: null,
    job_title: null,
    department: null,
    skills: [],
    expertise_areas: [],
    tools_used: [],
    goals: [],
    pain_points: [],
    communication_style: {
      formality: null,
      detail_level: null,
      technical_depth: null,
      examples_preference: null,
    },
    work_preferences: {
      focus_time: null,
      collaboration_style: null,
      decision_making: null,
      feedback_preference: null,
    },
    ai_interaction_style: null,
    preferred_tone: null,
    extraction_confidence: { overall: 0, fields_found: 0, fields_inferred: 0 },
  };

  for (const r of results) {
    // Scalars: last non-null wins
    if (r.name) merged.name = r.name;
    if (r.email) merged.email = r.email;
    if (r.job_title) merged.job_title = r.job_title;
    if (r.department) merged.department = r.department;
    if (r.ai_interaction_style) merged.ai_interaction_style = r.ai_interaction_style;
    if (r.preferred_tone) merged.preferred_tone = r.preferred_tone;

    // Arrays: deduplicated union
    merged.skills = dedup([...merged.skills, ...(r.skills || [])]);
    merged.expertise_areas = dedup([...merged.expertise_areas, ...(r.expertise_areas || [])]);
    merged.tools_used = dedup([...merged.tools_used, ...(r.tools_used || [])]);
    merged.goals = dedup([...merged.goals, ...(r.goals || [])]);
    merged.pain_points = dedup([...merged.pain_points, ...(r.pain_points || [])]);

    // Nested objects: last non-null wins per field
    if (r.communication_style) {
      if (r.communication_style.formality) merged.communication_style.formality = r.communication_style.formality;
      if (r.communication_style.detail_level) merged.communication_style.detail_level = r.communication_style.detail_level;
      if (r.communication_style.technical_depth) merged.communication_style.technical_depth = r.communication_style.technical_depth;
      if (r.communication_style.examples_preference) merged.communication_style.examples_preference = r.communication_style.examples_preference;
    }
    if (r.work_preferences) {
      if (r.work_preferences.focus_time) merged.work_preferences.focus_time = r.work_preferences.focus_time;
      if (r.work_preferences.collaboration_style) merged.work_preferences.collaboration_style = r.work_preferences.collaboration_style;
      if (r.work_preferences.decision_making) merged.work_preferences.decision_making = r.work_preferences.decision_making;
      if (r.work_preferences.feedback_preference) merged.work_preferences.feedback_preference = r.work_preferences.feedback_preference;
    }
  }

  // Compute merged confidence
  const avgConfidence = Math.round(results.reduce((s, r) => s + (r.extraction_confidence?.overall || 0), 0) / results.length);
  const totalFound = results.reduce((s, r) => s + (r.extraction_confidence?.fields_found || 0), 0);
  const totalInferred = results.reduce((s, r) => s + (r.extraction_confidence?.fields_inferred || 0), 0);
  merged.extraction_confidence = { overall: Math.min(avgConfidence + 10, 100), fields_found: totalFound, fields_inferred: totalInferred };

  return merged;
}

function mergeProfiles(results: ProfileExtractionData[]): ProfileExtractionData {
  const merged: ProfileExtractionData = {
    company_info: { name: null, tagline: null, description: null, industry: null, size: null, founded: null, headquarters: null, website: null, email: null, phone: null },
    branding: { primary_color: null, secondary_color: null },
    services: [],
    team_members: [],
    compliance: { certifications: [], regulations: [] },
    extraction_confidence: { overall: 0, fields_found: 0, sections_populated: [] },
  };

  for (const r of results) {
    // Company info: last non-null wins
    if (r.company_info) {
      for (const key of Object.keys(r.company_info) as (keyof typeof r.company_info)[]) {
        if (r.company_info[key]) (merged.company_info as any)[key] = r.company_info[key];
      }
    }
    if (r.branding) {
      if (r.branding.primary_color) merged.branding.primary_color = r.branding.primary_color;
      if (r.branding.secondary_color) merged.branding.secondary_color = r.branding.secondary_color;
    }

    // Arrays: accumulate, dedup by title/name
    if (r.services?.length) {
      for (const s of r.services) {
        if (!merged.services.some(ms => ms.title.toLowerCase() === s.title.toLowerCase())) {
          merged.services.push(s);
        }
      }
    }
    if (r.team_members?.length) {
      for (const m of r.team_members) {
        if (!merged.team_members.some(tm => tm.name.toLowerCase() === m.name.toLowerCase())) {
          merged.team_members.push(m);
        }
      }
    }
    if (r.compliance) {
      merged.compliance.certifications = dedup([...merged.compliance.certifications, ...(r.compliance.certifications || [])]);
      merged.compliance.regulations = dedup([...merged.compliance.regulations, ...(r.compliance.regulations || [])]);
    }
  }

  const avgConfidence = Math.round(results.reduce((s, r) => s + (r.extraction_confidence?.overall || 0), 0) / results.length);
  const totalFound = results.reduce((s, r) => s + (r.extraction_confidence?.fields_found || 0), 0);
  const allSections = dedup(results.flatMap(r => r.extraction_confidence?.sections_populated || []));
  merged.extraction_confidence = { overall: Math.min(avgConfidence + 10, 100), fields_found: totalFound, sections_populated: allSections };

  return merged;
}

function dedup(arr: string[]): string[] {
  const seen = new Set<string>();
  return arr.filter(item => {
    const lower = item.toLowerCase().trim();
    if (seen.has(lower)) return false;
    seen.add(lower);
    return true;
  });
}
