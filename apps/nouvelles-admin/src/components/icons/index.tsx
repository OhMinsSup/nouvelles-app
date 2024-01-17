import type { LucideProps } from 'lucide-react';
import {
  LayoutDashboard,
  AlertTriangle,
  ArrowRight,
  ChevronsRight,
  ChevronsLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Combine,
  File,
  Newspaper,
  PlusCircle,
  FileText,
  HelpCircle,
  ArrowUp,
  Image,
  Laptop,
  Loader2,
  Moon,
  MoreVertical,
  EyeOff,
  Pizza,
  Plus,
  Settings,
  SunMedium,
  Trash,
  Twitter,
  User,
  X,
  Settings2,
  Home,
  Search,
  Heart,
  PenSquare,
  Github,
  AlignLeft,
  MoreHorizontal,
  Repeat,
  MessageSquare,
  AlignCenter,
  AlignJustify,
  AlignRight,
  Baseline,
  Bold,
  ChevronDown,
  ChevronsUpDown,
  Code2,
  Edit2,
  ExternalLink,
  Eye,
  FileCode,
  GripVertical,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Indent,
  Italic,
  Keyboard,
  Link2,
  Link2Off,
  List,
  ListOrdered,
  MessageSquarePlus,
  Minus,
  Outdent,
  PaintBucket,
  Pilcrow,
  Quote,
  RectangleHorizontal,
  RectangleVertical,
  RotateCcw,
  Smile,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  Text,
  Underline,
  WrapText,
  CalendarCheck2,
  Rss,
  Menu,
  LayoutList,
  Tag,
} from 'lucide-react';
import { cva } from 'class-variance-authority';

const borderAll = (props: LucideProps) => (
  <svg
    fill="currentColor"
    focusable="false"
    height="48"
    role="img"
    viewBox="0 0 24 24"
    width="48"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6zm10 13h5a1 1 0 0 0 1-1v-5h-6v6zm-2-6H5v5a1 1 0 0 0 1 1h5v-6zm2-2h6V6a1 1 0 0 0-1-1h-5v6zm-2-6H6a1 1 0 0 0-1 1v5h6V5z" />
  </svg>
);

const borderBottom = (props: LucideProps) => (
  <svg
    fill="currentColor"
    focusable="false"
    height="48"
    role="img"
    viewBox="0 0 24 24"
    width="48"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M13 5a1 1 0 1 0 0-2h-2a1 1 0 1 0 0 2h2zm-8 6a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2zm-2 7a1 1 0 1 1 2 0 1 1 0 0 0 1 1h12a1 1 0 0 0 1-1 1 1 0 1 1 2 0 3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm17-8a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1zM7 4a1 1 0 0 0-1-1 3 3 0 0 0-3 3 1 1 0 0 0 2 0 1 1 0 0 1 1-1 1 1 0 0 0 1-1zm11-1a1 1 0 1 0 0 2 1 1 0 0 1 1 1 1 1 0 1 0 2 0 3 3 0 0 0-3-3z" />
  </svg>
);

const borderLeft = (props: LucideProps) => (
  <svg
    fill="currentColor"
    focusable="false"
    height="48"
    role="img"
    viewBox="0 0 24 24"
    width="48"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M6 21a1 1 0 1 0 0-2 1 1 0 0 1-1-1V6a1 1 0 0 1 1-1 1 1 0 0 0 0-2 3 3 0 0 0-3 3v12a3 3 0 0 0 3 3zm7-16a1 1 0 1 0 0-2h-2a1 1 0 1 0 0 2h2zm6 6a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0v-2zm-5 9a1 1 0 0 1-1 1h-2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1zm4-17a1 1 0 1 0 0 2 1 1 0 0 1 1 1 1 1 0 1 0 2 0 3 3 0 0 0-3-3zm-1 17a1 1 0 0 0 1 1 3 3 0 0 0 3-3 1 1 0 1 0-2 0 1 1 0 0 1-1 1 1 1 0 0 0-1 1z" />
  </svg>
);

const borderNone = (props: LucideProps) => (
  <svg
    fill="currentColor"
    focusable="false"
    height="48"
    role="img"
    viewBox="0 0 24 24"
    width="48"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M14 4a1 1 0 0 1-1 1h-2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1zm-9 7a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2zm14 0a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0v-2zm-6 10a1 1 0 1 0 0-2h-2a1 1 0 1 0 0 2h2zM7 4a1 1 0 0 0-1-1 3 3 0 0 0-3 3 1 1 0 0 0 2 0 1 1 0 0 1 1-1 1 1 0 0 0 1-1zm11-1a1 1 0 1 0 0 2 1 1 0 0 1 1 1 1 1 0 1 0 2 0 3 3 0 0 0-3-3zM7 20a1 1 0 0 1-1 1 3 3 0 0 1-3-3 1 1 0 1 1 2 0 1 1 0 0 0 1 1 1 1 0 0 1 1 1zm11 1a1 1 0 1 1 0-2 1 1 0 0 0 1-1 1 1 0 1 1 2 0 3 3 0 0 1-3 3z" />
  </svg>
);

const borderRight = (props: LucideProps) => (
  <svg
    fill="currentColor"
    focusable="false"
    height="48"
    role="img"
    viewBox="0 0 24 24"
    width="48"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M13 5a1 1 0 1 0 0-2h-2a1 1 0 1 0 0 2h2zm-8 6a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2zm9 9a1 1 0 0 1-1 1h-2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1zM6 3a1 1 0 0 1 0 2 1 1 0 0 0-1 1 1 1 0 0 1-2 0 3 3 0 0 1 3-3zm1 17a1 1 0 0 1-1 1 3 3 0 0 1-3-3 1 1 0 1 1 2 0 1 1 0 0 0 1 1 1 1 0 0 1 1 1zm11 1a1 1 0 1 1 0-2 1 1 0 0 0 1-1V6a1 1 0 0 0-1-1 1 1 0 1 1 0-2 3 3 0 0 1 3 3v12a3 3 0 0 1-3 3z" />
  </svg>
);

const borderTop = (props: LucideProps) => (
  <svg
    fill="currentColor"
    focusable="false"
    height="48"
    role="img"
    viewBox="0 0 24 24"
    width="48"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M3 6a1 1 0 0 0 2 0 1 1 0 0 1 1-1h12a1 1 0 0 1 1 1 1 1 0 1 0 2 0 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3zm2 5a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2zm14 0a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0v-2zm-5 9a1 1 0 0 1-1 1h-2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1zm-8 1a1 1 0 1 0 0-2 1 1 0 0 1-1-1 1 1 0 1 0-2 0 3 3 0 0 0 3 3zm11-1a1 1 0 0 0 1 1 3 3 0 0 0 3-3 1 1 0 1 0-2 0 1 1 0 0 1-1 1 1 1 0 0 0-1 1z" />
  </svg>
);

const kakao = (props: LucideProps) => (
  // 카카오톡 svg를 만들어줘
  <svg
    fill="none"
    height="100%"
    viewBox="0 0 24 24"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M12.296 8.455c-2.122 0-3.841 1.314-3.841 2.936 0 1.008.665 1.897 1.677 2.426l-.426 1.54a.152.152 0 0 0 .062.164.158.158 0 0 0 .178.002l1.868-1.22c.158.015.318.024.48.024 2.122 0 3.842-1.315 3.842-2.936s-1.72-2.936-3.841-2.936"
      fill="#000"
      fillOpacity="0.9"
      fillRule="evenodd"
    />
  </svg>
);

export const Icons = {
  logo: (props: LucideProps) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"
        fill="currentColor"
      />
    </svg>
  ),

  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  home: Home,
  search: Search,
  pen: PenSquare,
  heart: Heart,
  alignLeft: AlignLeft,
  moreHorizontal: MoreHorizontal,
  repeat: Repeat,
  messageSquare: MessageSquare,
  twitter: Twitter,
  check: Check,
  alignCenter: AlignCenter,
  alignJustify: AlignJustify,
  alignRight: AlignRight,
  arrowDown: ChevronDown,
  bg: PaintBucket,
  blockquote: Quote,
  bold: Bold,
  borderAll,
  borderBottom,
  borderLeft,
  borderNone,
  borderRight,
  borderTop,
  chevronsUpDown: ChevronsUpDown,
  clear: X,
  code: Code2,
  codeblock: FileCode,
  color: Baseline,
  column: RectangleVertical,
  comment: MessageSquare,
  commentAdd: MessageSquarePlus,
  delete: Trash,
  dragHandle: GripVertical,
  editing: Edit2,
  emoji: Smile,
  externalLink: ExternalLink,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  h5: Heading5,
  h6: Heading6,
  image: Image,
  indent: Indent,
  italic: Italic,
  kbd: Keyboard,
  lineHeight: WrapText,
  link: Link2,
  minus: Minus,
  more: MoreHorizontal,
  ol: ListOrdered,
  outdent: Outdent,
  paragraph: Pilcrow,
  refresh: RotateCcw,
  row: RectangleHorizontal,
  strikethrough: Strikethrough,
  subscript: Subscript,
  superscript: Superscript,
  table: Table,
  text: Text,
  ul: List,
  underline: Underline,
  unlink: Link2Off,
  viewing: Eye,
  today: CalendarCheck2,
  github: Github,
  setting: Settings2,
  rss: Rss,
  menu: Menu,
  dashboard: LayoutDashboard,
  combine: Combine,
  arrowUp: ArrowUp,
  eyeOff: EyeOff,
  plusCircle: PlusCircle,
  chevronsRight: ChevronsRight,
  chevronsLeft: ChevronsLeft,
  layoutList: LayoutList,
  kakao,
  tag: Tag,
  newspaper: Newspaper,
};

export const iconVariants = cva('', {
  variants: {
    variant: {
      toolbar: 'h-5 w-5',
      menuItem: 'mr-2 h-5 w-5',
    },
    size: {
      sm: 'mr-2 h-4 w-4',
      md: 'mr-2 h-6 w-6',
    },
  },
  defaultVariants: {},
});
