# Multiple pods in My Pod — preview 0.3.0

[Open the gallery](https://sundar2005.github.io/my-pod-app-preview/) · [All screenshots](README.md)

All names, evidence and approvals below are fictional local sample data. This gallery demonstrates app behaviour; no person is monitored and no messages or alerts are sent.

| Scenario | People and purpose | What to explore |
| --- | --- | --- |
| [Family Pod](https://sundar2005.github.io/my-pod-app-preview/#screen=family-overview) | Amma, Appa, Paati and Kavin. A circle for family wellbeing. | Recent phone activity, movement, an activity gap, unavailable status, acknowledgement and a recorded contact outcome. |
| [Close Buddies Pod](https://sundar2005.github.io/my-pod-app-preview/#screen=buddies-members) | Meena, Arjun and Kavin. Friends looking out for each other. | Friend details, an invitation addressed to Close Buddies, friend-only updates and Kavin's membership in two circles. |
| [My Office Pod](https://sundar2005.github.io/my-pod-app-preview/#screen=office-members) | Kavya and Rahul. A voluntary circle of colleagues. | Office-only members and updates, an Office invitation, the sample approved-people list, and unavailable human activity despite device connectivity. |

## Switching and isolation

1. Open the pod selector on My pod and choose a circle.
2. The member list changes. Kavin appears in both Family and Close Buddies; this does not expose Family-only members to the friends view.
3. Open Invite: the destination circle is named before entering a recipient name.
4. Open Updates: the selected circle is retained. Paati's Family incident is absent from the other circles.
5. Close and reopen the app: the selected circle is restored.
6. Return to Family: the saved follow-up acknowledgement/outcome remains intact.

The Office circle is opt-in and excludes attendance and performance tracking. Connectivity alone never establishes that someone is active. Membership of one circle does not imply approval to see another circle's updates.

## Current development boundary

These are three predefined local preview circles. The sample approved-person lists follow the selected circle. Pause, optional explicit check-ins and city sharing remain device-wide settings; separate per-pod sharing controls are not implemented yet.

Custom pod creation, real invitation acceptance, verified membership and revocation, server-side access controls, schedules and multi-pod alert delivery require the connected service milestone. Family has the sample incident lifecycle; Buddies and Office demonstrate circles with no open incidents. This does not claim that multiple simultaneous real incidents have been implemented or tested.

Android runtime captures are included. SwiftUI source mirrors the flows, but native iOS compilation and simulator testing require Mac/Xcode and remain pending.
