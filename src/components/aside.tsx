import React from "react";

interface AsideProps {
  children: React.ReactNode;
}

export default function Aside({ children }: AsideProps) {
  return (
    <>
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      {children}
      <aside className="drawer-side z-10">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        {/* <!-- sidebar menu --> */}
        <nav className="flex min-h-screen w-72 flex-col gap-2 overflow-y-auto bg-base-100 px-6 py-10">
          <div className="mx-4 flex items-center gap-2 font-black">
            <svg
              width="32"
              height="32"
              viewBox="0 0 1024 1024"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="256"
                y="670.72"
                width="512"
                height="256"
                rx="128"
                className="fill-base-content"
              />
              <circle
                cx="512"
                cy="353.28"
                r="256"
                className="fill-base-content"
              />
              <circle
                cx="512"
                cy="353.28"
                r="261"
                stroke="black"
                stroke-opacity="0.2"
                stroke-width="10"
              />
              <circle
                cx="512"
                cy="353.28"
                r="114.688"
                className="fill-base-100"
              />
            </svg>
            Daisy Corp
          </div>
          <ul className="menu">
            <li>
              <a className="active">
                <svg
                  data-src="https://unpkg.com/heroicons/20/solid/home.svg"
                  className="h-5 w-5"
                ></svg>
                Dashboard
              </a>
            </li>
            <li>
              <a>
                <svg
                  data-src="https://unpkg.com/heroicons/20/solid/user.svg"
                  className="h-5 w-5"
                ></svg>
                Users
              </a>
            </li>
            <li>
              <details>
                <summary>
                  <svg
                    data-src="https://unpkg.com/heroicons/20/solid/squares-2x2.svg"
                    className="h-5 w-5"
                  ></svg>
                  Products
                </summary>
                <ul>
                  <li>
                    <a>All Products</a>
                  </li>
                  <li>
                    <a>Add New</a>
                  </li>
                  <li>
                    <a>Categories</a>
                  </li>
                  <li>
                    <a>Tags</a>
                  </li>
                  <li>
                    <a>Reports</a>
                  </li>
                  <li>
                    <a>Archive</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>
                  <svg
                    data-src="https://unpkg.com/heroicons/20/solid/credit-card.svg"
                    className="h-5 w-5"
                  ></svg>
                  Transactions
                </summary>
                <ul>
                  <li>
                    <a>All Transactions</a>
                  </li>
                  <li>
                    <a>Failed Transactions</a>
                  </li>
                  <li>
                    <a>Successful Transactions</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>
                <svg
                  data-src="https://unpkg.com/heroicons/20/solid/chart-pie.svg"
                  className="h-5 w-5"
                ></svg>
                Stats
              </a>
            </li>
            <li>
              <a>
                <svg
                  data-src="https://unpkg.com/heroicons/20/solid/document-text.svg"
                  className="h-5 w-5"
                ></svg>
                Logs
              </a>
            </li>
            <li>
              <a>
                <svg
                  data-src="https://unpkg.com/heroicons/20/solid/inbox.svg"
                  className="h-5 w-5"
                ></svg>
                Messages
                <span className="badge badge-info badge-sm">12</span>
              </a>
            </li>
            <li>
              <details>
                <summary>
                  <svg
                    data-src="https://unpkg.com/heroicons/20/solid/adjustments-vertical.svg"
                    className="h-5 w-5"
                  ></svg>
                  Settings
                </summary>
                <ul>
                  <li>
                    <a>General</a>
                  </li>
                  <li>
                    <a>Themes</a>
                  </li>
                  <li>
                    <a>Routes</a>
                  </li>
                  <li>
                    <a>Comments</a>
                  </li>
                  <li>
                    <a>Media</a>
                  </li>
                  <li>
                    <a>Roles</a>
                  </li>
                  <li>
                    <a>Merchants</a>
                  </li>
                  <li>
                    <a>Tools</a>
                    <ul>
                      <li>
                        <a>Files</a>
                      </li>
                      <li>
                        <a>Scripts</a>
                      </li>
                      <li>
                        <a>Suggestions</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a>Databases</a>
                  </li>
                  <li>
                    <a>Gateways</a>
                  </li>
                  <li>
                    <a>Plugins</a>
                  </li>
                  <li>
                    <a>API</a>
                  </li>
                  <li>
                    <a>Support</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </nav>
        {/* <!-- /sidebar menu --> */}
      </aside>
    </>
  );
}
