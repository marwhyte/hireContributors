export interface collaborator {
  id: number;
  name: string | null;
  company?: string | null;
  avatarURL?: string | null;
  followers?: number | null;
  following?: number | null;
  bio?: string | null;
  hireable?: boolean | null;
}
export interface dataObject {
  packageName: string;
  packageApiRepo: string;
  packageRepo: string;
  collaborators: collaborator[];
}
export interface graphData {
  id: number;
  name: string | null;
  packageName: string;
  company?: string | null;
  avatarURL?: string | null;
  followers?: number | null;
  following?: number | null;
  bio?: string | null;
  hireable?: boolean | null;
}
