import React from "react";

export default function ProductBenefits({ benefits }) {
  return (
    <ul className="pdp-benefits" aria-label="Pack benefits">
      {benefits.map((b) => (
        <li className="pdp-benefit" key={b.title}>
          <span className="pdp-benefit-dot" aria-hidden="true" />
          <span>
            <strong>{b.title}</strong>
            <span className="pdp-benefit-note">{b.note}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
