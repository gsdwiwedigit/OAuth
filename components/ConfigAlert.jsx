
"use client";

import { useState, useEffect } from "react";

export default function ConfigAlert() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check configuration
    fetch("/api/check-config")
      .then((res) => res.json())
      .then((data) => {
        setConfig(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || !config) return null;

  const hasIssues = config.missingRequired.length > 0 || config.enabledProviders === 0;

  if (!hasIssues) return null;

  return (
    <div className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-slideDown">
      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-red-400 mb-2">
              Configuration Issues
            </h3>
            
            {config.missingRequired.length > 0 && (
              <div className="mb-2">
                <p className="text-xs text-red-300 mb-1">Missing Required:</p>
                <ul className="text-xs text-red-200 space-y-0.5">
                  {config.missingRequired.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            )}

            {config.enabledProviders === 0 && (
              <p className="text-xs text-red-300">
                ⚠️ No OAuth providers configured
              </p>
            )}

            {config.missingProviders.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-yellow-300">
                  Disabled providers: {config.missingProviders.join(", ")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
