import { TablePageContainer } from 'app/components';
import config from 'app/config';
import { useEffect, useRef } from 'react';

interface ISisenseDashboard {
  token: string;
  dashboardId: string;
}
declare global {
  interface Window { "sisense.embed": any; }
}

const SisenseDashboard = ({ token, dashboardId }: ISisenseDashboard) => {
  const iFrameElement = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    // This component creates an iframe element setting the initial src to log the user in via a JWT
    // once that load has finished, the onLoad handler is called (loadDashboard). This then
    // hands over to the SiSense API to initialise the iframe and complete the embedding.

    const { SisenseFrame, enums } = window['sisense.embed'];

    const sisenseFrame = new SisenseFrame({
      // Sisense application URL, including protocol and port if required
      url: config.env.sisenseUrl,
      // OID of dashboard to load initially
      dashboard: dashboardId,
      wat: token,
      // Which panels to show in the iFrame
      settings: {
        showLeftPane: false,
        showToolbar: true,
        showRightPane: true,
      },
      // You can define existing <iframe/> DOM element here or
      // pass some <div/> as a parameter to render function below
      // and <iframe/> will be rendered inside that <div/> dynamically
      // element: document.getElementById('sisense-iframe'),
      element: iFrameElement.current,
    });

    sisenseFrame.render().then(() => {
      // TODO: Implement the next feature here.
    });
  }, [token, dashboardId])

  return (
    <TablePageContainer>
      <iframe
        id="sisense-iframe"
        ref={iFrameElement}
        className="container"
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="auto"
        title="test"
      >
      </iframe>
    </TablePageContainer>
  );
};

export default SisenseDashboard;
