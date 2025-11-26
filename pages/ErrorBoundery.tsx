import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import GlobalErrorPage from "./ErrorPage";

export default function ErrorBoundary({ children }: any) {
    return (
        <ReactErrorBoundary
            fallbackRender={({ error }: any) => (
                <GlobalErrorPage status={500} message={error.message} />
            )}
        >
            {children}
        </ReactErrorBoundary>
    );
}
