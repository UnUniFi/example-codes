export type DefineInstance<T> = {
  /** div wrapped in a jQuery object */
  canvas: any;
  /** changes the value of a state */
  publishState: (name: string, value: any) => void;
  /** triggers an event */
  triggerEvent: (name: string, callback: (err: Error) => void) => void;
  /** Object containing custom data - read and write by doing instance.data.your_variable */
  data: T;
};

export type Context = {
  currentUser: any;
  /** main jQuery object */
  jQuery: any;
  uploadContent: (fileName: string, contents: string, callback: (err: Error, url: string) => void, attachTo?: any) => void;
  /** call context.async with a function that kicks off an asynchronous operation, taking a callback taking (err, res). Returns res or else throws error. */
  async: (callback: (err: Error, res: any) => void) => void;
  /** Object with Keys defined in the Plugins Tab */
  keys: any;
  /** function that runs callback once cookies are allowed (immediately if already accepted) */
  onCookieOptIn: (callback: () => void) => void;
  /** function that reports an error to the debugger */
  reportDebugger: (message: string) => void;
};
