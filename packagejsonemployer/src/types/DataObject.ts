export interface collaborator {
  id: number;
  name: string | null;
  company?: string | null;
  avatarURL?: string | null;
  followers?: number | null;
  following?: number | null;
  bio?: string | null;
  hireable?: boolean | null;
  contributions?: number | null;
  type?: string | null;
  login?: string | null;
  location?: string | null;
  githubURL?: string;
  packageRank?: number;
}
export interface dataObject {
  packageName: string;
  packageApiRepo: string;
  packageRepo: string;
  collaborators: collaborator[];
  starGazers?: number | null;
  language?: string | null;
}
export interface graphData {
  id: number;
  name: string | null;
  packageName: string;
  starGazers?: number | null;
  language?: string | null;
  company?: string | null;
  avatarURL?: string | null;
  followers?: number | null;
  following?: number | null;
  bio?: string | null;
  hireable?: boolean | null;
  contributions?: number | null;
  type?: string | null;
  login?: string | null;
  location?: string | null;
  githubURL?: string;
  packageRank?: number;
}
