import PropTypes from 'prop-types';
import ChatUI from '@/features/chat/components/ChatUI';

/**
 * @fileoverview Handles the AI Assistant chat widget in the Hero section.
 * Renders the static embedded terminal on desktop.
 * Mobile logic is handled by GlobalChatFAB.
 */

/**
 * TerminalWindow main wrapper component.
 * @returns {React.ReactElement}
 */
export default function TerminalWindow() {
  return (
    <>
      {/* Desktop Static View: Hidden on < lg (1024px) */}
      <div className="hidden lg:flex justify-center items-center z-10 w-full">
        <ChatUI isFloating={false} />
      </div>
    </>
  );
}

TerminalWindow.propTypes = {
  isBooted: PropTypes.bool,
};
