export interface LinkItem {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  humorDesc: string;
  category: string;
  badge: string;
  badgeColor: string;
  accentColor: string;
  bgLightColor: string;
  iconName: 'sparkles' | 'code' | 'linkedin' | 'palette' | 'github' | 'globe' | 'film';
  stats: {
    label: string;
    value: string;
  };
  tags: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  icon?: string;
  highlighted?: boolean;
}
