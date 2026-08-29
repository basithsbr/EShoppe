
import { use } from 'react';
import ServerCard from '@/components/ui/server/productscards';
import RightSheetWrapper from '@/components/ui/RightSheetWrapper';

interface ControllerProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function RightSheetController({ searchParams }: ControllerProps) {
  // Safely unwraps the search parameters on the server
  const resolvedParams = use(searchParams);
  const activeServerId = typeof resolvedParams.serverId === 'string' ? resolvedParams.serverId : null;

  return (
    // <RightSheetWrapper isOpen={!!activeServerId}>
      {/* ServerCard compiles into raw HTML on your server before shipping to browser */}
      // {activeServerId && <ServerCard id={activeServerId} />}
    // </RightSheetWrapper>
    
  );
}
